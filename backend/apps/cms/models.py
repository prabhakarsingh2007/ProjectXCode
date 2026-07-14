from django.db import models  # pyrefly: ignore [missing-import]
from django.conf import settings  # pyrefly: ignore [missing-import]

class Service(models.Model):
    BILLING_CHOICES = (
        ('one_time', 'One Time'),
        ('monthly', 'Monthly'),
        ('annual', 'Annual'),
    )
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='Layers')  # Lucide icon name
    price = models.DecimalField(max_digits=10, decimal_places=2)
    billing_cycle = models.CharField(max_length=20, choices=BILLING_CHOICES, default='one_time')
    
    def __str__(self):
        return self.title


class PortfolioItem(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    client = models.CharField(max_length=100, blank=True, null=True)
    completion_date = models.DateField(blank=True, null=True)
    image = models.ImageField(upload_to='portfolio/', blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)  # Backup for remote assets/placeholders
    category = models.CharField(max_length=50, default='Web Development')
    technologies = models.CharField(max_length=255, blank=True, default='')
    status = models.CharField(max_length=20, default='completed')  # 'completed' or 'ongoing'
    live_url = models.CharField(max_length=255, blank=True, null=True)
    github_url = models.CharField(max_length=255, blank=True, null=True)
    is_confidential = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title


class Testimonial(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='testimonials'
    )
    client_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default='Client')
    message = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review by {self.client_name} ({self.rating} stars)"
