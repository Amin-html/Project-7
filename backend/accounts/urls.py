from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Регистрация
    path('register/', views.register, name='register'),
    # Вход — возвращает access + refresh токены
    path('login/', TokenObtainPairView.as_view(), name='login'),
    # Обновление токена
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]