from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authors.views import AuthorModelViewSet
from myusers.views import LibraryUserModelViewSet
from todoapp.views import ProjectViewSet, ToDoViewSet

router = DefaultRouter()
router.register("authors", AuthorModelViewSet)
router.register("libraryusers", LibraryUserModelViewSet)
router.register("projects", ProjectViewSet)
router.register("todos", ToDoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
]
