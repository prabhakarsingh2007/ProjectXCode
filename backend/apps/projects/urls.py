from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectRequestViewSet

router = DefaultRouter()
router.register(r'', ProjectRequestViewSet, basename='projectrequest')

urlpatterns = [
    path('', include(router.urls)),
]
