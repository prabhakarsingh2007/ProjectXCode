import logging
import stripe
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Payment
from .serializers import PaymentSerializer
from projects.models import ProjectRequest
from notifications.models import Notification
from .invoice_generator import generate_invoice_pdf
from notifications.messenger import send_email_notification, send_whatsapp_notification

logger = logging.getLogger('projectxcode')

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role == 'admin':
            return Payment.objects.select_related('project_request').all().order_by('-created_at')
        return Payment.objects.select_related('project_request').filter(project_request__client=user).order_by('-created_at')

    def perform_create(self, serializer):
        payment = serializer.save()
        
        # If payment succeeded, update project details
        if payment.status == 'completed':
            project = payment.project_request
            project.payment_status = 'paid'
            if project.status == 'pending':
                project.status = 'in_progress'
            project.save()
            
            logger.info(f"Payment completed directly: ${payment.amount} for project: '{project.title}'")
            
            # Send Notification
            Notification.objects.create(
                user=project.client,
                title="Payment Received",
                message=f"We received your payment of ${payment.amount} for '{project.title}'. Project status is now In Progress!"
            )
            
            # Generate invoice PDF for email attachment
            pdf_buffer = generate_invoice_pdf(payment)
            
            # Dispatch Email and WhatsApp notifications
            send_email_notification(
                subject="Payment Receipt Confirmed - ProjectXCode",
                recipient=project.client.email,
                body=f"Hello {project.client.username},\n\nThank you! We have verified your transaction of ${payment.amount} for '{project.title}'. The team is already working on your customized workspace. Your invoice is attached.",
                attachment_buffer=pdf_buffer,
                attachment_name=f"Invoice-{payment.transaction_id}.pdf"
            )
            send_whatsapp_notification(
                phone_number=project.client.phone or '+919999999999',
                body=f"Hi {project.client.username}, your payment of ${payment.amount} for '{project.title}' has been successfully processed! Let's build something awesome."
            )

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def create_checkout_session(self, request):
        project_id = request.data.get('project_request')
        if not project_id:
            return Response({'detail': 'project_request is required.'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            project = ProjectRequest.objects.get(pk=project_id)
        except ProjectRequest.DoesNotExist:
            return Response({'detail': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
            
        # Permission check
        if not request.user.is_staff and request.user.role != 'admin' and project.client != request.user:
            return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
            
        if project.payment_status == 'paid':
            return Response({'detail': 'Project is already paid.'}, status=status.HTTP_400_BAD_REQUEST)

        stripe.api_key = settings.STRIPE_SECRET_KEY

        # Fallback if key is mock
        if settings.STRIPE_SECRET_KEY.startswith('sk_test_mock_'):
            mock_url = f"{settings.CLIENT_URL}/dashboard?payment=success&mock=true&project_id={project.id}&amount={project.budget}"
            return Response({'checkout_url': mock_url})

        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': f"Project: {project.title}",
                            'description': f"Service Package: {project.service.title if project.service else 'Custom Scope'}",
                        },
                        'unit_amount': int(project.budget * 100),
                    },
                    'quantity': 1,
                }],
                mode='payment',
                client_reference_id=str(project.id),
                success_url=settings.CLIENT_URL + '/dashboard?payment=success',
                cancel_url=settings.CLIENT_URL + '/dashboard?payment=cancel',
            )
            return Response({'checkout_url': session.url})
        except Exception as e:
            logger.error(f"Stripe Session Create error: {str(e)}")
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def download_invoice(self, request, pk=None):
        payment = self.get_object()
        # Non-staff user can only download their own invoice
        if not request.user.is_staff and request.user.role != 'admin' and payment.project_request.client != request.user:
            return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
            
        if payment.status != 'completed':
            return Response({'detail': 'Invoice is only available for completed payments.'}, status=status.HTTP_400_BAD_REQUEST)
        
        pdf_buffer = generate_invoice_pdf(payment)
        logger.info(f"Invoice PDF generated for Transaction: {payment.transaction_id}")
        return FileResponse(
            pdf_buffer, 
            as_attachment=True, 
            filename=f"Invoice-{payment.transaction_id}.pdf",
            content_type='application/pdf'
        )

@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        payload = request.data
        event_type = payload.get('type')
        
        logger.info(f"Stripe webhook event received: {event_type}")
        
        if event_type == 'checkout.session.completed':
            session = payload.get('data', {}).get('object', {})
            project_id = session.get('client_reference_id')
            amount_total = session.get('amount_total', 0) / 100
            transaction_id = session.get('payment_intent') or 'TXN-STRIPE-WEBHOOK-MOCK'
            
            try:
                project = ProjectRequest.objects.get(pk=project_id)
                # Create payment log automatically
                payment, created = Payment.objects.get_or_create(
                    project_request=project,
                    defaults={
                        'amount': amount_total,
                        'payment_method': 'Stripe Webhook',
                        'transaction_id': transaction_id,
                        'status': 'completed'
                    }
                )
                
                if created or payment.status != 'completed':
                    payment.status = 'completed'
                    payment.save()
                    
                    project.payment_status = 'paid'
                    if project.status == 'pending':
                        project.status = 'in_progress'
                    project.save()
                    
                    logger.info(f"Stripe Webhook payment processed successfully: ${amount_total} for project '{project.title}'")
                    
                    Notification.objects.create(
                        user=project.client,
                        title="Payment Completed via Stripe",
                        message=f"Stripe confirmed your payment of ${amount_total} for '{project.title}'."
                    )
                    
                    pdf_buffer = generate_invoice_pdf(payment)
                    send_email_notification(
                        subject="Stripe Payment Successful - ProjectXCode",
                        recipient=project.client.email,
                        body=f"Hello {project.client.username},\n\nStripe has processed your invoice payment of ${amount_total} for '{project.title}'. Project is now In Progress! Your invoice is attached.",
                        attachment_buffer=pdf_buffer,
                        attachment_name=f"Invoice-{payment.transaction_id}.pdf"
                    )
                    send_whatsapp_notification(
                        phone_number=project.client.phone or '+919999999999',
                        body=f"Hi {project.client.username}, Stripe confirmed your payment of ${amount_total} for '{project.title}'. Project is now In Progress!"
                    )
            except ProjectRequest.DoesNotExist:
                logger.error(f"Stripe Webhook error: Project Request ID {project_id} not found.")
                return Response({'detail': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
                
        return Response({'status': 'success'}, status=status.HTTP_200_OK)
