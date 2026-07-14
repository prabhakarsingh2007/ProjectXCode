from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import AgencyFile
from .serializers import AgencyFileSerializer

class AgencyFileViewSet(viewsets.ModelViewSet):
    serializer_class = AgencyFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role == 'admin':
            return AgencyFile.objects.select_related('user').all().order_by('-created_at')
        return AgencyFile.objects.select_related('user').filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        uploaded_file = self.request.FILES.get('file')
        file_type = uploaded_file.content_type if uploaded_file else 'unknown'
        serializer.save(user=self.request.user, file_type=file_type)
