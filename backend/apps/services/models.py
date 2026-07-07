from django.db import models

class Service(models.Model):
    BILLING_CHOICES = (
        ('one_time', 'One Time'),
        ('monthly', 'Monthly'),
        ('annual', 'Annual'),
    )
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='Layers')  # Store Lucide icon name
    price = models.DecimalField(max_digits=10, decimal_places=2)
    billing_cycle = models.CharField(max_length=20, choices=BILLING_CHOICES, default='one_time')
    
    def __str__(self):
        return self.title
