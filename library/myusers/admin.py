from django.contrib import admin

from .models import LibraryUser


@admin.register(LibraryUser)
class PersonAdmin(admin.ModelAdmin):
    pass
