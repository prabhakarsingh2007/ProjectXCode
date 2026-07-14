from django.urls import path, include  # pyrefly: ignore [missing-import]
from rest_framework.routers import DefaultRouter  # pyrefly: ignore [missing-import]
from .views import PortfolioItemViewSet

router = DefaultRouter()
router.register(r'', PortfolioItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
