from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .models import Message
from .serializers import MessageSerializer
from listings.models import Listing

class MessageListAPI(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [ IsAuthenticated ]

    def get_queryset(self):
        # Сообщения по конкретному объявлению
        listing_id = self.kwargs['listing_id']
        return Message.objects.filter(listing_id=listing_id)

    def perform_create(self, serializer):
        listing_id = self.kwargs['listing_id']
        listing = Listing.objects.get(pk=listing_id)
        # Автоматически ставим отправителя и объявление
        serializer.save(
            sender=self.request.user,
            listing=listing
        )

# Create your views here.
