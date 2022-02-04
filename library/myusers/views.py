from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import LibraryUser
from .serializers import LibraryUserModelSerializer
from rest_framework import mixins


"""class LibraryUserModelViewSet(ModelViewSet):
    queryset = LibraryUser.objects.all()
    serializer_class = LibraryUserModelSerializer"""


class LibraryUserModelViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet
):
    permission_classes = [permissions.IsAuthenticated]
    queryset = LibraryUser.objects.all()
    serializer_class = LibraryUserModelSerializer
