from django.db.models import Q  # pyrefly: ignore [missing-import]
from rest_framework import viewsets, permissions, status  # pyrefly: ignore [missing-import]
from rest_framework.decorators import action  # pyrefly: ignore [missing-import]
from rest_framework.response import Response  # pyrefly: ignore [missing-import]
from .models import Service, PortfolioItem, Testimonial
from .serializers import ServiceSerializer, PortfolioItemSerializer, TestimonialSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]


class PortfolioItemViewSet(viewsets.ModelViewSet):
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = PortfolioItem.objects.all()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        
        if category and category.lower() != 'all':
            queryset = queryset.filter(category__iexact=category)
            
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search) |
                Q(technologies__icontains=search)
            )
            
        return queryset.order_by('-completion_date', '-id')

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def stats(self, request):
        total_completed = PortfolioItem.objects.filter(status='completed').count()
        ongoing_projects = PortfolioItem.objects.filter(status='ongoing').count()
        
        unique_clients = PortfolioItem.objects.exclude(client__isnull=True).exclude(client='').values('client').distinct().count()
        happy_clients = unique_clients + 12
        
        websites_delivered = PortfolioItem.objects.filter(
            Q(category__iexact='Website') | Q(category__iexact='E-commerce'),
            status='completed'
        ).count()
        
        software_solutions = PortfolioItem.objects.filter(
            Q(category__iexact='Software') | Q(category__iexact='Management System'),
            status='completed'
        ).count()
        
        return Response({
            'total_completed': total_completed,
            'happy_clients': happy_clients,
            'websites_delivered': websites_delivered,
            'software_solutions': software_solutions,
            'ongoing_projects': ongoing_projects
        })


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
