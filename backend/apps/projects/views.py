from rest_framework import viewsets, permissions
from .models import ProjectRequest
from .serializers import ProjectRequestSerializer
from notifications.models import Notification

class ProjectRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role == 'admin':
            return ProjectRequest.objects.all().order_by('-created_at')
        return ProjectRequest.objects.filter(client=user).order_by('-created_at')
        
    def perform_create(self, serializer):
        project = serializer.save(client=self.request.user)
        # Automatically generate a notification for the client
        Notification.objects.create(
            user=self.request.user,
            title="Project Request Submitted",
            message=f"Your project request '{project.title}' has been received and is pending review."
        )
