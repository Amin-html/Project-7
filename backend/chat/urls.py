from django.urls import path
from . import views

urlpatterns = [
    path('messages/<int:listing_id>/', views.MessageListAPI.as_view()),
]