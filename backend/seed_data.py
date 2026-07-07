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
        'title': 'Nexus FinTech Portal',
        'description': 'A premium secure portal offering bank-level ledgering and analytical widgets for investment workflows.',
        'client': 'Nexus Capital',
        'category': 'Software',
        'technologies': 'React, Django, PostgreSQL, Redux',
        'status': 'completed',
        'completion_date': '2026-01-15',
        'image_url': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        'live_url': 'https://nexus.projectxcode.com',
        'github_url': '',
        'is_confidential': True
    },
    {
        'title': 'Aetheria E-Commerce Platform',
        'description': 'A responsive, high-converting digital storefront equipped with complex filter queries and automated inventory control.',
        'client': 'Aetheria Clothing',
        'category': 'E-commerce',
        'technologies': 'Next.js, Node.js, Stripe, MongoDB',
        'status': 'completed',
        'completion_date': '2026-03-10',
        'image_url': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'live_url': 'https://aetheria.projectxcode.com',
        'github_url': 'https://github.com/prabhakarsingh2007/aetheria-store',
        'is_confidential': False
    },
    {
        'title': 'Apex Hospital Management System',
        'description': 'A multi-role SaaS application managing patient records, staff schedules, prescription logs, and automatic billing systems.',
        'client': 'Apex Health Group',
        'category': 'Management System',
        'technologies': 'React, Python, Django REST, SQLite',
        'status': 'completed',
        'completion_date': '2026-04-05',
        'image_url': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        'live_url': '',
        'github_url': '',
        'is_confidential': True
    },
    {
        'title': 'Smart Agriculture IoT Monitor',
        'description': 'A fully documented student engineering project integrating soil sensor arrays, Arduino hubs, and a Django visual dashboard.',
        'client': 'Purnea Tech Academy',
        'category': 'Final Year Project',
        'technologies': 'React, Python, Arduino, C++',
        'status': 'completed',
        'completion_date': '2026-05-20',
        'image_url': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        'live_url': 'https://smart-agri.projectxcode.com',
        'github_url': 'https://github.com/prabhakarsingh2007/smart-agriculture-iot',
        'is_confidential': False
    },
    {
        'title': 'Horizon Corporate Website',
        'description': 'A modern, responsive marketing page for a global consulting firm featuring micro-interactions and dark-mode gradients.',
        'client': 'Horizon LLC',
        'category': 'Website',
        'technologies': 'React, Tailwind CSS, Framer Motion',
        'status': 'completed',
        'completion_date': '2026-06-01',
        'image_url': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        'live_url': 'https://horizon.projectxcode.com',
        'github_url': 'https://github.com/prabhakarsingh2007/horizon-corp',
        'is_confidential': False
    },
    {
        'title': 'Nova CRM Dashboard',
        'description': 'An ongoing custom CRM software suite built to streamline customer relationship operations and analytics.',
        'client': 'Nova Solutions',
        'category': 'Management System',
        'technologies': 'React, Node.js, Express, PostgreSQL',
        'status': 'ongoing',
        'completion_date': '2026-08-30',
        'image_url': 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
        'live_url': '',
        'github_url': '',
        'is_confidential': True
    },
    {
        'title': 'E-Learning Video Management System',
        'description': 'A dynamic university thesis model featuring course progress steps, video player dashboards, and automated quiz generators.',
        'client': 'Bihar Science College',
        'category': 'Final Year Project',
        'technologies': 'React, Python, Django, PostgreSQL',
        'status': 'completed',
        'completion_date': '2026-06-25',
        'image_url': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        'live_url': 'https://elearn.projectxcode.com',
        'github_url': 'https://github.com/prabhakarsingh2007/elearn-django',
        'is_confidential': False
    },
    {
        'title': 'Vibe Social Media App',
        'description': 'An ongoing real-time chat and feed sharing social system optimized for socket connections and mobile responsive designs.',
        'client': 'Vibe Inc.',
        'category': 'Software',
        'technologies': 'React Native, Django Channels, WebSockets',
        'status': 'ongoing',
        'completion_date': '2026-09-15',
        'image_url': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
        'live_url': '',
        'github_url': '',
        'is_confidential': False
    }
]

# Wipe old portfolio objects first to update schema cleanly
from portfolio.models import PortfolioItem
PortfolioItem.objects.all().delete()

for item in portfolio_data:
    PortfolioItem.objects.create(**item)
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
