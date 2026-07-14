from django.contrib import admin
from .models import AgencyFile

@admin.register(AgencyFile)
class AgencyFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'file_name', 'file_size', 'file_type', 'created_at')
    list_filter = ('file_type', 'created_at')
    search_fields = ('file_name', 'user__username', 'user__email')
    readonly_fields = ('created_at',)
