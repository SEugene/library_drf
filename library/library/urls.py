from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from authors.views import AuthorModelViewSet
from myusers.views import LibraryUserModelViewSet
from todoapp.views import ProjectViewSet, ToDoViewSet

router = DefaultRouter()
router.register("authors", AuthorModelViewSet)
router.register("libraryusers/0.1", LibraryUserModelViewSet)
router.register("projects", ProjectViewSet)
router.register("todos", ToDoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api-token-auth/", views.obtain_auth_token),
    path("api/", include(router.urls)),
    # re_path(r'^api/(?P<version>\d\.\d)/libraryusers/$', LibraryUserModelViewSet.as_view({'get': 'list'})),
    path("api/libraryusers/0.1", include("myusers.urls", namespace="0.1")),
    path("api/libraryusers/0.2", include("myusers.urls", namespace="0.2")),
]
