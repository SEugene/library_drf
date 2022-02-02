import json
import re
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
#from django.contrib.auth.models import User
from authors.views import AuthorModelViewSet
from authors.models import Author
from myusers.models import LibraryUser



class TestAuthorViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {'last_name': 'Лермонтов', 'birthday_year': 1814}, format='json')
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {'last_name': 'Лермонтов', 'birthday_year': 1814}, format='json')
        admin = LibraryUser.objects.create_superuser(username='admin', password='admin123456')
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_get_detail(self):
        author = Author.objects.create(last_name='Лермонтов', birthday_year=1814)
        client = APIClient()
        response = client.get(f'/api/authors/{author.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

    def test_edit_guest(self):
        author = Author.objects.create(last_name='Лермонтов', birthday_year=1814)
        client = APIClient()
        response = client.put(f'/api/authors/{author.uuid}/', {'name':'Грин', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    
    def test_edit_admin(self):
        author = Author.objects.create(last_name='Лермонтов', birthday_year=1814)
        client = APIClient()
        admin = LibraryUser.objects.create_superuser(username='admin', password='admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/authors/{author.uuid}/', {'last_name':'Грин', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        author = Author.objects.get(uuid=author.uuid)
        self.assertEqual(author.last_name, 'Грин')
        self.assertEqual(author.birthday_year, 1880)
        client.logout()
