import json
from multiprocessing.connection import Client
import re
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
#from django.contrib.auth.models import User
from authors.views import AuthorModelViewSet
from authors.models import Author
from myusers.models import LibraryUser
from todoapp.models import ToDo, Project

from rest_framework.authtoken.models import Token



class TestAuthorViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {'first_name': 'Михаил', 'last_name': 'Лермонтов', 'birthday_year': 1814}, format='json')
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {'first_name': 'Михаил', 'last_name': 'Лермонтов', 'birthday_year': 1814}, format='json')
        admin = LibraryUser.objects.create_superuser(username='admin', password='admin123456', email='admin@mail.ru')
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_get_detail(self):
        author = Author.objects.create(first_name='Михаил', last_name='Лермонтов', birthday_year=1814)
        client = APIClient()
        response = client.get(f'/api/authors/{author.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

    def test_edit_guest(self):
        author = Author.objects.create(first_name='Михаил', last_name='Лермонтов', birthday_year=1814)
        client = APIClient()
        response = client.put(f'/api/authors/{author.uuid}/', {'name':'Грин', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    
    def test_edit_admin(self):
        author = Author.objects.create(first_name='Михаил', last_name='Лермонтов', birthday_year=1814)
        admin = LibraryUser.objects.create_superuser(username='admin', password='admin123456', email='admin@mail.ru')    
       
        client = APIClient()
        client.login(username='admin', password='admin123456')
        
        # lodin success check
        self.assertTrue(self.client.login(username='admin', password='admin123456'))
        
        response = client.put(f'/api/authors/{author.uuid}/', {'last_name':'Грин', 'first_name': 'Александр', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        author = Author.objects.get(uuid=author.uuid)
        self.assertEqual(author.last_name, 'Грин')
        self.assertEqual(author.birthday_year, 1880)
        client.logout()

    
class TestToDoViewSet(APITestCase):   
    
    def test_get_list(self):
        admin = LibraryUser.objects.create_superuser(username='admin', password='admin123456', email='admin@mail.ru')
        self.client.login(username='admin', password='admin123456')
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

    def test_edit_admin(self):        
        todoauthor = LibraryUser.objects.create(username='NewUser')
        project = Project.objects.create(project_name='Twenteeth_Project')
        project.project_users.set([todoauthor])
        todo = ToDo.objects.create(todo_text='some text', project=project, todo_author=todoauthor)
        admin = LibraryUser.objects.create_superuser(username='admin', password='admin123456', email='admin@mail.ru')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.id}/', {'todo_text': 'some new text', 'todo_author': todoauthor.id, 
        'project': todo.project.uuid})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.todo_text,'some new text')

    
    def test_edit_admin_mixers(self):        
        todo = mixer.blend(ToDo)    
        admin = LibraryUser.objects.create_superuser(username='admin', password='admin123456', email='admin@mail.ru')

        todo.project.project_users.set([admin])

        self.client.login(username='admin', password='admin123456')
        # lodin success check
        self.assertTrue(self.client.login(username='admin', password='admin123456'))      

        response = self.client.put(f'/api/todos/{todo.id}/', {'todo_text': 'some new text', 'todo_author': admin.id,
         'project': todo.project.uuid})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.todo_text,'some new text')
