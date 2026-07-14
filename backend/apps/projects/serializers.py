# pyrefly: ignore [missing-import]
from rest_framework import serializers
from .models import ProjectRequest
from cms.serializers import ServiceSerializer
from cms.models import Service

class ProjectRequestSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.username', read_only=True)
    service_detail = ServiceSerializer(source='service', read_only=True)
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), required=False, allow_null=True)
    payment_id = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = ProjectRequest
        fields = ('id', 'client', 'client_name', 'service', 'service_detail', 'title', 'description', 'budget', 'status', 'payment_status', 'created_at', 'payment_id', 'file_attachment')
        read_only_fields = ('client', 'status', 'payment_status')

    def get_payment_id(self, obj):
        completed_payment = obj.payments.filter(status='completed').first()
        return completed_payment.id if completed_payment else None
