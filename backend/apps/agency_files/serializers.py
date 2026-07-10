from rest_framework import serializers
from .models import AgencyFile

class AgencyFileSerializer(serializers.ModelSerializer):
    uploader_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = AgencyFile
        fields = '__all__'
        read_only_fields = ('user', 'file_name', 'file_size', 'file_type', 'created_at')
