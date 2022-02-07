import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from myusers.models import LibraryUser


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class LibraryUsersType(DjangoObjectType):
    class Meta:
        model = LibraryUser
        fields = "__all__"


class ToDoMutation(graphene.Mutation):
    class Arguments:
        todo_text = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, todo_text, id):
        todo = ToDo.objects.get(pk=id)
        todo.todo_text = todo_text
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_authors = graphene.List(LibraryUsersType)
    all_projects = graphene.List(ProjectType)

    project_by_uuid = graphene.Field(ProjectType, uuid=graphene.String(required=True))
    user_by_id = graphene.Field(LibraryUsersType, id=graphene.Int(required=True))

    todos_by_author_name = graphene.List(ToDoType, name=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_authors(root, info):
        return LibraryUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_project_by_uuid(root, info, uuid):
        try:
            return Project.objects.get(uuid=uuid)
        except:
            return None

    def resolve_user_by_id(self, info, id):
        try:
            return LibraryUser.objects.get(id=id)
        except:
            return None

    def resolve_todos_by_author_name(self, info, name=None):
        todos = ToDo.objects.all()
        if name:
            todos = todos.filter(todo_author__username=name)
        return todos


schema = graphene.Schema(query=Query, mutation=Mutation)
