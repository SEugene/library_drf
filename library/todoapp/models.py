from django.db import models
from uuid import uuid4
from myusers.models import LibraryUser

class Project(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    project_name = models.CharField(max_length=64, unique=True)
    repository = models.URLField(blank=True)
    project_users = models.ManyToManyField(LibraryUser)


    def __str__(self):
        return self.project_name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    todo_text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    todo_author = models.ForeignKey(LibraryUser, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
