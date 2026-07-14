from django.urls import path, include  # pyrefly: ignore [missing-import]
from rest_framework.routers import DefaultRouter  # pyrefly: ignore [missing-import]
from .views import TestimonialViewSet

router = DefaultRouter()
router.register(r'', TestimonialViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
