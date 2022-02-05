from django.urls import path
from .views import LibraryUserModelViewSet

app_name = 'myusers'
urlpatterns = [
    path('', LibraryUserModelViewSet.as_view({'get': 'list'})),
]