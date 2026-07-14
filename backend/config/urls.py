from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def sitemap_view(request):
    sitemap_xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://projectxcode.com/</loc>
        <lastmod>2026-07-14</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://projectxcode.com/about</loc>
        <lastmod>2026-07-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://projectxcode.com/services</loc>
        <lastmod>2026-07-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://projectxcode.com/pricing</loc>
        <lastmod>2026-07-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://projectxcode.com/portfolio</loc>
        <lastmod>2026-07-14</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://projectxcode.com/contact</loc>
        <lastmod>2026-07-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://projectxcode.com/privacy</loc>
        <lastmod>2026-07-14</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
</urlset>"""
    return HttpResponse(sitemap_xml, content_type='application/xml')

def robots_view(request):
    robots_txt = """User-agent: *
Allow: /
Sitemap: https://projectxcode.com/sitemap.xml
"""
    return HttpResponse(robots_txt, content_type='text/plain')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sitemap.xml', sitemap_view),
    path('robots.txt', robots_view),
    
    # API endpoints
    path('api/accounts/', include('accounts.urls')),
    path('api/services/', include('cms.urls_services')),
    path('api/portfolio/', include('cms.urls_portfolio')),
    path('api/enquiries/', include('enquiries.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/testimonials/', include('cms.urls_testimonials')),
    path('api/notifications/', include('notifications.urls')),
    path('api/dashboard/', include('dashboard.urls')),
    path('api/tickets/', include('tickets.urls')),
    path('api/agency-files/', include('agency_files.urls')),
]

# Serve media & static files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
