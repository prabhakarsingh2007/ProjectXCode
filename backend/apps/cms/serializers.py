from rest_framework import serializers  # pyrefly: ignore [missing-import]
from .models import Service, PortfolioItem, Testimonial

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'
        read_only_fields = ('client_name', 'role', 'user', 'is_featured')
