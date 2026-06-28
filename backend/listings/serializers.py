from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Listing
from categories.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon']

class OwnerSerializer(serializers.ModelSerializer):
    # Показываем только нужные поля владельца
    class Meta:
        model = User
        fields = ['id', 'username']

class ListingSerializer(serializers.ModelSerializer):
    # Вложенные сериализаторы — показываем объекты а не id
    owner = OwnerSerializer(read_only=True)
    category_detail = CategorySerializer(
        source='category',
        read_only=True
    )
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = [
            'id', 'title', 'description', 'price',
            'location', 'status', 'image_url',
            'owner', 'category', 'category_detail',
            'created_at'
        ]
        # category — для записи (принимаем id)
        # category_detail — для чтения (возвращаем объект)

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None

    def create(self, validated_data):
        # Автоматически ставим владельца из запроса
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)