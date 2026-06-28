from django.db import models
from django.contrib.auth.models import User
from categories.models import Category

class Listing(models.Model):
    STATUS_CHOICES = [
        ('active', 'Активно'),
        ('sold', 'Продано'),
        ('inactive', 'Неактивно'),
    ]

    # Владелец объявления
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='listings'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='listings'
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.IntegerField()
    location = models.CharField(max_length=100)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='active'
    )
    image = models.ImageField(
        upload_to='listings/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Новые объявления сначала
        ordering = ['-created_at']

    def __str__(self):
        return self.title