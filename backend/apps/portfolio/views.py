from django.db.models import Q
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PortfolioItem
from .serializers import PortfolioItemSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class PortfolioItemViewSet(viewsets.ModelViewSet):
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = PortfolioItem.objects.all()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        
        if category and category.lower() != 'all':
            # Map category queries cleanly
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
        
        # Unique clients count
        unique_clients = PortfolioItem.objects.exclude(client__isnull=True).exclude(client='').values('client').distinct().count()
        # Add a base trust constant of 12 representing historical offline client workspace commissions
        happy_clients = unique_clients + 12
        
        # Websites delivered
        websites_delivered = PortfolioItem.objects.filter(
            Q(category__iexact='Website') | Q(category__iexact='E-commerce'),
            status='completed'
        ).count()
        
        # Software solutions
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

