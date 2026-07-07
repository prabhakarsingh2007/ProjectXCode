from django.db import models
from django.conf import settings

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

