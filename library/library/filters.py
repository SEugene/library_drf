from dataclasses import fields
from django_filters import rest_framework as filters
from authors.models import Author
from todoapp.models import Project, ToDo


class AuthorFilter(filters.FilterSet):
    first_name = filters.CharFilter(lookup_expr='contains')
    last_name = filters.CharFilter(lookup_expr='contains')
    birthday_year = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Author
        fields = ['first_name', 'last_name', 'birthday_year']


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['project_name']


class ToDoFilter(filters.FilterSet):
    project_id = filters.UUIDFilter()
    created = filters.DateFromToRangeFilter()
    updated = filters.DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project_id', 'created', 'updated']
