from django.db import models
from django.contrib.auth.models import User
from listings.models import Listing

class Message(models.Model):
    listing = models.ForeignKey(
        Listing,
        on_delete=models.CASCADE,
        related_name='messages'
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # старые сообщения сначала

    def __str__(self):
        return f"{self.sender.username}: {self.text[:50]}"
# Create your models here.
