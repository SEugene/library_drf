from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import LibraryUser


class LibraryUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = LibraryUser
        fields = ("id", "url", "username", "firstname", "lastname", "email", "password")

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class LibraryUserModelSerializerNew(ModelSerializer):
    class Meta:
        model = LibraryUser
        fields = ("url", "username", "email", "is_staff", "is_superuser")
