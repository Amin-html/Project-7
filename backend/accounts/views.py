from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Проверяем что пользователь не существует
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Пользователь уже существует'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Создаём пользователя
    user = User.objects.create_user(
        username=username,
        password=password
    )

    # Сразу выдаём токены
    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'username': user.username,
        'user_id': user.id
    })

# Create your views here.

# Create your views here.
