from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import Author
from .serializers import AuthorModelSerializer
from library.filters import AuthorFilter


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    filterset_class = AuthorFilter
