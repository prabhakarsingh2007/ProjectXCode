from django.contrib import admin  # pyrefly: ignore [missing-import]
from .models import Service, PortfolioItem, Testimonial

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'billing_cycle', 'icon')
    list_filter = ('billing_cycle',)
    search_fields = ('title', 'description')


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'client', 'category', 'status', 'completion_date', 'is_confidential')
    list_filter = ('category', 'status', 'is_confidential', 'completion_date')
    search_fields = ('title', 'description', 'client', 'technologies')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('id', 'client_name', 'role', 'rating', 'is_featured', 'created_at')
    list_filter = ('rating', 'is_featured', 'created_at')
    search_fields = ('client_name', 'message', 'role')
    readonly_fields = ('created_at',)
