# pyrefly: ignore [missing-import]
from rest_framework import viewsets, permissions
from .models import Testimonial
from .serializers import TestimonialSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by('-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(
            user=user,
            client_name=f"{user.first_name or user.username}",
            role="Client Partner"
        )
