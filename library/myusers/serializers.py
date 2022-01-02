from rest_framework.serializers import HyperlinkedModelSerializer
from .models import LibraryUser


class LibraryUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = LibraryUser
        fields = ("url", "username", "firstname", "lastname", "email")
