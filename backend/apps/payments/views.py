from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer
from projects.models import ProjectRequest
from notifications.models import Notification

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role == 'admin':
            return Payment.objects.all().order_by('-created_at')
        return Payment.objects.filter(project_request__client=user).order_by('-created_at')

    def perform_create(self, serializer):
        payment = serializer.save()
        
        # If payment succeeded, update project details
        if payment.status == 'completed':
            project = payment.project_request
            project.payment_status = 'paid'
            if project.status == 'pending':
                project.status = 'in_progress'
            project.save()
            
            # Send notification
            Notification.objects.create(
                user=project.client,
                title="Payment Received",
                message=f"We received your payment of ${payment.amount} for '{project.title}'. Project status is now In Progress!"
            )
