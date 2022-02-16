from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from authors.models import Author
from todoapp.models import Project, ToDo
from myusers.models import LibraryUser


class Command(BaseCommand):

    def handle(self, *args, **options):
        Project.objects.all().delete()
        Author.objects.all().delete()
        ToDo.objects.all().delete()
        LibraryUser.objects.all().delete()
        
        authors = [
            {'first_name': 'Александр', 'last_name': 'Грин', 'birthday_year': 1880},
            {'first_name': 'Александр', 'last_name': 'Пушкин', 'birthday_year': 1799}
        ]

        libraryusers = [
            {'username': 'User005', 'email': 'user005@mail.ru', 'is_active': True, 'is_superuser': True},
            {'username': 'User008', 'email': 'user008@mail.ru', 'is_active': True, 'is_superuser': False}
        ]

        projects = [
            {'project_name': 'First_Project', 'repository': ''},
            {'project_name': 'Fourth_Project', 'repository': ''},
            {'project_name': 'Tenth_Project', 'repository': ''}
        ]

        todos = [
            {'project': 'First_Project', 'todo_text': 'Todo 1', 'todo_author': 'User005', 'is_active': True},
            {'project': 'First_Project', 'todo_text': 'Todo 2', 'todo_author': 'User005', 'is_active': True},
            {'project': 'Fourth_Project', 'todo_text': 'Todo 3', 'todo_author': 'User005', 'is_active': True},
            {'project': 'Fourth_Project', 'todo_text': 'Todo 4', 'todo_author': 'User005', 'is_active': True},
            {'project': 'Tenth_Project', 'todo_text': 'Todo 5', 'todo_author': 'User008', 'is_active': True},
            {'project': 'Tenth_Project', 'todo_text': 'Todo 6', 'todo_author': 'User008', 'is_active': True}
        ]

        for item in authors:
            Author.objects.create(**item)

        for item in libraryusers:
            LibraryUser.objects.create(**item)        
        
        for item in projects:
            
            project_item = Project.objects.create(**item)
            project_item.project_users.add(LibraryUser.objects.first())
           
            


        for item in todos:
            item['project'] = Project.objects.get(project_name=item['project'])
            item['todo_author'] = LibraryUser.objects.get(username=item['todo_author'])
            ToDo.objects.create(**item)  

        #User.objects.all().delete()
        Group.objects.all().delete()

        # создаем суперпользователя. Админ может всё
        LibraryUser.objects.create_superuser('admin', 'admin123456')

        # Получаем Права
        # todos
        add_todo = Permission.objects.get(codename='add_todo')
        change_todo = Permission.objects.get(codename='change_todo')
        delete_todo = Permission.objects.get(codename='delete_todo')

        # projects
        add_project = Permission.objects.get(codename='add_project')
        change_project = Permission.objects.get(codename='change_project')
        delete_project = Permission.objects.get(codename='delete_project')

        # создаем группы
        # младшие сотрудники
        little_staff = Group.objects.create(name='Младшие сотрудники')
        # права этой группы только книги, остальное просмотр
        
        little_staff.permissions.add(add_todo)
        little_staff.permissions.add(change_todo)
        little_staff.permissions.add(delete_todo)
        # # старшие сотрудники
     
        big_staff = Group.objects.create(name='Старшие сотрудники')
        # права этой группы книги и авторы, остальное просмотр
        big_staff.permissions.add(add_todo)
        big_staff.permissions.add(change_todo)
        big_staff.permissions.add(delete_todo)

        big_staff.permissions.add(add_project)
        big_staff.permissions.add(change_project)
        big_staff.permissions.add(delete_project)

        # Остальные могу только смотреть 

        # Создаем пользователей и добавляем в группы
        little = LibraryUser.objects.get(username='User008')
        little.groups.add(little_staff)
        little.save()

        big = LibraryUser.objects.get(username='User005')
        big.groups.add(big_staff)
        big.save()

        print('done')
