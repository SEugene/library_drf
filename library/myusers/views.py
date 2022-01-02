from rest_framework.viewsets import ModelViewSet
from .models import LibraryUser
from .serializers import LibraryUserModelSerializer


class LibraryUserModelViewSet(ModelViewSet):
   queryset = LibraryUser.objects.all()
   serializer_class = LibraryUserModelSerializer
