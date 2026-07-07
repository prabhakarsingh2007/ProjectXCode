from rest_framework import serializers
from .models import ProjectRequest
from services.serializers import ServiceSerializer
from services.models import Service

class ProjectRequestSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.username', read_only=True)
    service_detail = ServiceSerializer(source='service', read_only=True)
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), required=False, allow_null=True)
    
    class Meta:
        model = ProjectRequest
        fields = ('id', 'client', 'client_name', 'service', 'service_detail', 'title', 'description', 'budget', 'status', 'payment_status', 'created_at')
        read_only_fields = ('client', 'status', 'payment_status')
