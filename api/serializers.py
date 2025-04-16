# api/serializers.py
from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
        
    def validate_email(self, value):
        # Custom email validation if needed
        if not value.strip():
            raise serializers.ValidationError("Email cannot be empty")
        return value
    
    def validate_phone_number(self, value):
        # Ensure phone number contains only digits and common separators
        import re
        if not re.match(r'^[0-9\-\+\(\) ]+$', value):
            raise serializers.ValidationError("Invalid phone number format")
        return value
