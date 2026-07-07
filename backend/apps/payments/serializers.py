from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source='project_request.title', read_only=True)
    
    class Meta:
        model = Payment
        fields = ('id', 'project_request', 'project_title', 'amount', 'payment_method', 'transaction_id', 'status', 'created_at')
