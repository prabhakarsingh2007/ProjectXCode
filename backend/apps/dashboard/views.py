from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Sum
from projects.models import ProjectRequest
from payments.models import Payment
from enquiries.models import Enquiry
from notifications.models import Notification
from projects.serializers import ProjectRequestSerializer
from notifications.serializers import NotificationSerializer

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        if user.is_staff or user.role == 'admin':
            # Admin Dashboard stats
            total_revenue = Payment.objects.filter(status='completed').aggregate(sum=Sum('amount'))['sum'] or 0.0
            pending_projects = ProjectRequest.objects.filter(status='pending').count()
            active_projects = ProjectRequest.objects.filter(status='in_progress').count()
            total_projects = ProjectRequest.objects.count()
            total_enquiries = Enquiry.objects.count()
            unresolved_enquiries = Enquiry.objects.filter(is_resolved=False).count()
            
            # Recent items
            recent_projects = ProjectRequest.objects.select_related('client', 'service').all().order_by('-created_at')[:5]
            recent_enquiries = Enquiry.objects.all().order_by('-created_at')[:5]
            
            return Response({
                'role': 'admin',
                'stats': {
                    'totalRevenue': float(total_revenue),
                    'pendingProjects': pending_projects,
                    'activeProjects': active_projects,
                    'totalProjects': total_projects,
                    'totalEnquiries': total_enquiries,
                    'unresolvedEnquiries': unresolved_enquiries,
                },
                'recentProjects': ProjectRequestSerializer(recent_projects, many=True).data,
                'recentEnquiries': list(recent_enquiries.values('id', 'name', 'email', 'subject', 'created_at', 'is_resolved'))
            })
            
        else:
            # Client Dashboard stats
            user_projects = ProjectRequest.objects.filter(client=user)
            active_projects = user_projects.filter(status='in_progress').count()
            pending_projects = user_projects.filter(status='pending').count()
            completed_projects = user_projects.filter(status='completed').count()
            
            total_paid = Payment.objects.filter(project_request__client=user, status='completed').aggregate(sum=Sum('amount'))['sum'] or 0.0
            
            recent_projects = user_projects.select_related('client', 'service').order_by('-created_at')[:5]
            recent_notifications = Notification.objects.filter(user=user).order_by('-created_at')[:5]
            
            return Response({
                'role': 'client',
                'stats': {
                    'activeProjects': active_projects,
                    'pendingProjects': pending_projects,
                    'completedProjects': completed_projects,
                    'totalPaid': float(total_paid),
                },
                'recentProjects': ProjectRequestSerializer(recent_projects, many=True).data,
                'recentNotifications': NotificationSerializer(recent_notifications, many=True).data
            })
