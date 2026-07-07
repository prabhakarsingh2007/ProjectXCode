from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/accounts/', include('accounts.urls')),
    path('api/services/', include('services.urls')),
    path('api/portfolio/', include('portfolio.urls')),
    path('api/enquiries/', include('enquiries.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/testimonials/', include('testimonials.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]

# Serve media & static files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
