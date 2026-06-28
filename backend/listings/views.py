from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Listing
from .serializers import ListingSerializer
from .models import Category
from .serializers import CategorySerializer

class CategoryListAPI(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ListingListAPI(generics.ListCreateAPIView):
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Listing.objects.filter(status='active')

        # Фильтры из URL параметров
        category = self.request.query_params.get('category')
        query = self.request.query_params.get('q')
        location = self.request.query_params.get('location')

        if category:
            queryset = queryset.filter(category__slug=category)
        if query:
            queryset = queryset.filter(title__icontains=query)
        if location:
            queryset = queryset.filter(location__icontains=location)

        return queryset

class ListingDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        listing = self.get_object()
        # Только владелец может редактировать
        if listing.owner != request.user:
            return Response(
                {'error': 'Нет прав'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        listing = self.get_object()
        # Только владелец может удалять
        if listing.owner != request.user:
            return Response(
                {'error': 'Нет прав'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)

class MyListingsAPI(generics.ListAPIView):
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Только объявления текущего пользователя
        return Listing.objects.filter(owner=self.request.user)