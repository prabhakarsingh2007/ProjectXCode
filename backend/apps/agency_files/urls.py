from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgencyFileViewSet

router = DefaultRouter()
router.register(r'files', AgencyFileViewSet, basename='file')

urlpatterns = [
    path('', include(router.urls)),
]
