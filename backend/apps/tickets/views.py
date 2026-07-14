from rest_framework import viewsets, permissions
from .models import SupportTicket
from .serializers import SupportTicketSerializer

class SupportTicketViewSet(viewsets.ModelViewSet):
    serializer_class = SupportTicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role == 'admin':
            return SupportTicket.objects.select_related('client').all().order_by('-created_at')
        return SupportTicket.objects.select_related('client').filter(client=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)
