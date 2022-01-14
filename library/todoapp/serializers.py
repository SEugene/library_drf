from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'