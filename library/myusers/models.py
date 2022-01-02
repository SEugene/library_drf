from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from .manager import CustomUserManager


class LibraryUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_('username'), max_length=30, unique=True)
    firstname = models.CharField(_('name'), max_length=30, blank=True)
    lastname = models.CharField(_('surname'), max_length=30, blank=True)
    email = models.EmailField(_('email'), unique=True)
    is_active = models.BooleanField(_('is_active'), default=True)
    is_staff = models.BooleanField(_('is_staff'), default=False)
        
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('libraryuser')
        verbose_name_plural = _('libraryusers')

    def get_full_name(self):
        #Возвращает first_name и last_name с пробелом между ними
        full_name = '%s %s' % (self.firstname, self.lastname)
        return full_name.strip()

    def get_short_name(self):
        #Возвращает сокращенное имя пользователя
        return self.firstname
