from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    # Показываем имя отправителя
    sender_name = serializers.CharField(
        source='sender.username',
        read_only=True
    )

    class Meta:
        model = Message
        fields = [ 'id', 'text', 'sender_name', 'created_at' ]
