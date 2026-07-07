import os
import django
import sys

# Set up django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'apps'))
django.setup()

from django.contrib.auth import get_user_model
from services.models import Service
from portfolio.models import PortfolioItem
from testimonials.models import Testimonial

User = get_user_model()

# 1. Create admin user
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@projectxcode.com', 'Password123', role='admin')
    print("Superuser created (admin/Password123)")

# 2. Create demo client user
if not User.objects.filter(username='client').exists():
    User.objects.create_user('client', 'client@projectxcode.com', 'Password123', role='client', phone='1234567890', company='Client Corp')
    print("Client user created (client/Password123)")

# 3. Create services
services_data = [
    {
        'title': 'Premium Web Development',
        'description': 'End-to-end full-stack web applications built with modern tools like React, Django, and Node. Optimized for speed, security, and mobile responsiveness.',
        'icon': 'Code',
        'price': 2500.00,
        'billing_cycle': 'one_time'
    },
    {
        'title': 'UI/UX Brand Design',
        'description': 'Stunning, custom digital interfaces designed to wow your users. Includes interactive prototypes, wireframes, user journeys, and component library.',
        'icon': 'Palette',
        'price': 1200.00,
        'billing_cycle': 'one_time'
    },
    {
        'title': 'Dedicated Development Support',
        'description': 'Monthly retainer for direct access to engineers for bug fixing, server management, feature updates, and technical consulting.',
        'icon': 'Activity',
        'price': 800.00,
        'billing_cycle': 'monthly'
    },
]

for item in services_data:
    Service.objects.get_or_create(title=item['title'], defaults=item)
print("Services seeded")

# 4. Create portfolio items
portfolio_data = [
    {
        'title': 'Nexus FinTech Mobile Portal',
        'description': 'Designed and implemented a fast, secure dashboard portal for client payments and banking analytics.',
        'client': 'Nexus Capital',
        'category': 'Mobile Apps',
        'image_url': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
        'title': 'Aetheria E-Commerce Platform',
        'description': 'A premium Next.js storefront equipped with microservices backend support for automated inventory control and flash sales.',
        'client': 'Aetheria Clothing',
        'category': 'E-Commerce',
        'image_url': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
]

for item in portfolio_data:
    PortfolioItem.objects.get_or_create(title=item['title'], defaults=item)
print("Portfolio items seeded")

# 5. Create testimonials
testimonials_data = [
    {
        'client_name': 'Sarah Jenkins',
        'role': 'Product VP at Nexus Capital',
        'message': 'The ProjectXCode team exceeded all expectations! The frontend design is fluid and premium, and the backend handles high throughput seamlessly.',
        'rating': 5,
        'is_featured': True
    },
    {
        'client_name': 'Mark Rutherford',
        'role': 'Founder of Aetheria',
        'message': 'Outstanding performance and code architecture. They built our online shop 2 weeks ahead of schedule and the visual style is incredibly premium.',
        'rating': 5,
        'is_featured': True
    }
]

for item in testimonials_data:
    Testimonial.objects.get_or_create(client_name=item['client_name'], defaults=item)
print("Testimonials seeded")
