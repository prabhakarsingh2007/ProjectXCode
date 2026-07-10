from django.db import models
from django.conf import settings
from django.core.validators import FileExtensionValidator

class AgencyFile(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='uploaded_files'
    )
    file = models.FileField(
        upload_to='agency_files/', 
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'zip', 'docx', 'png', 'jpg', 'jpeg', 'txt'])]
    )
    file_name = models.CharField(max_length=255, blank=True)
    file_size = models.IntegerField(null=True, blank=True) # in bytes
    file_type = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.file and not self.file_name:
            self.file_name = self.file.name.split('/')[-1]
            try:
                self.file_size = self.file.size
            except Exception:
                pass
        super().save(*args, **kwargs)

    def __str__(self):
        return f"File {self.file_name} uploaded by {self.user.username}"
