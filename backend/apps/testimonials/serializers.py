# pyrefly: ignore [missing-import]
from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'
        read_only_fields = ('client_name', 'role', 'user', 'is_featured')
