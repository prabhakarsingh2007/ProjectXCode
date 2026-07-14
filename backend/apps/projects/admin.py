from django.contrib import admin
from .models import ProjectRequest

@admin.register(ProjectRequest)
class ProjectRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'title', 'budget', 'status', 'payment_status', 'created_at')
    list_filter = ('status', 'payment_status', 'created_at')
    search_fields = ('title', 'description', 'client__username', 'client__email')
    readonly_fields = ('created_at',)
