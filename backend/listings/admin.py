from django.contrib import admin
from .models import Listing

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = [ 'title', 'owner', 'category', 'price', 'status', 'location' ]
    list_filter = [ 'status', 'category' ]
    search_fields = [ 'title', 'owner__username' ]

# Register your models here.
