from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'project_request', 'amount', 'payment_method', 'transaction_id', 'status', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('transaction_id', 'project_request__title', 'project_request__client__username', 'project_request__client__email')
    readonly_fields = ('created_at',)
