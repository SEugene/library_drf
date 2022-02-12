from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import mixins, permissions
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from .serializers import ProjectSerializer, ToDoSerializer
from .models import Project, ToDo
from library.filters import ProjectFilter, ToDoFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 120


class ProjectViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class ToDoViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    # mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def delete(self, request, pk=None):
        data = get_object_or_404(ToDo, pk=pk)
        data.is_active = False
        data.save()
        serializer = ToDoSerializer(data)
        return Response(serializer.data)
