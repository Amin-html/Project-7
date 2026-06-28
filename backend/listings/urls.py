from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListAPI.as_view()),
    path('listings/', views.ListingListAPI.as_view(), name='listings_list'),
    path('listings/<int:pk>/', views.ListingDetailAPI.as_view(), name='listing_detail'),
    path('listings/my/', views.MyListingAPI.as_view(), name='my_listing'),
]