from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, ValidationError
from .models import Project, ToDo


class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"

    def validate_todo_author(self, value):
        destination_project = Project.objects.get(uuid=self.initial_data["project"]).project_name

        if value not in Project.objects.get(project_name=destination_project).project_users.all():
            raise ValidationError("an author should be in a list of project users")
        return value
