from django.db import models

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

