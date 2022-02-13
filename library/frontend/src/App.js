import React from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {BrowserRouter, Route, Routes, Link, Navigate} from 'react-router-dom';
import {v4 as UUID} from 'uuid'

import './App.css';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import LibraryUserList from './components/MyUser.js';
import ToDoProjectList from './components/ToDoProject.js';
import LoginForm from './components/Auth.js'
import ToDoForm from './components/ToDoForm.js'
import ProjectForm from './components/ProjectForm.js'
import ProjectSearchForm from './components/ProjectSearchForm.js'


class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           projects: [],
           libraryusers: [],
           todos: [],
           'token': '',
           'current_user': 'anonim'
       }
   };

  set_token(token, username) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
    cookies.set('current_user', username)
  };

  is_authenticated() {
    return this.state.token != ''
  };

  logout() {
    this.set_token('', 'anonim')
  };

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const current_user = cookies.get('current_user')
    this.setState({'token': token, 'current_user': current_user}, ()=>this.load_data())
  };

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
        
        this.set_token(response.data['token'], username)
    }).catch(error => alert('Wrong login or password'))
  };

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated())
      {
        headers['Authorization'] = 'Token ' + this.state.token
      }
    return headers
  };

  load_data() {    
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            this.setState({projects: response.data.results})

        }).catch(error => 
          console.log(error))
          this.setState({projects: []})

    axios.get('http://127.0.0.1:8000/api/libraryusers/0.1/', {headers})
        .then(response => {
            this.setState({libraryusers: response.data.results})
        }).catch(error => {
          console.log(error)
          this.setState({libraryusers: []})
        })

    axios.get('http://127.0.0.1:8000/api/todos/', {headers})
        .then(response => {
            this.setState({todos: response.data.results})
        }).catch(error => {
          console.log(error)
          this.setState({todos: []})
        })
  };


  deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers, headers})
        .then(response => {
          this.setState({todos: this.state.todos.filter((todo)=>todo.id !== id)})
        }).catch(error => console.log(error))
  }


  deleteProject(uuid) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${uuid}`, {headers, headers})
        .then(response => {
          this.setState({projects: this.state.projects.filter((project)=>project.uuid !== uuid)})
        }).catch(error => console.log(error))
  }


  createToDo(project, todoText, todoAuthor) {
    const headers = this.get_headers()    
    const data = {project: project, todoText: todoText, todoAuthor: todoAuthor}

    axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers, headers})
        .then(response => {          
          let new_todo = response.data
          
          const project = this.state.projects.filter((item) => item.uuid === new_todo.project)[0]
          new_todo.project = project

          const todoAuthor = this.state.libraryusers.filter((item) => item.id === new_todo.todoAuthor)[0]
          new_todo.todoAuthor = todoAuthor

          this.setState({todos: [...this.state.todos, new_todo]})
        }).catch(error => console.log(error))
  }


  createProject(uuid, projectName, projectUsers) {
    const headers = this.get_headers()
    uuid = UUID()
    const data = {uuid, projectName: projectName, projectUsers: [projectUsers]}

    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
        .then(response => {          
          let new_project = response.data
                             
          const projectUsers = this.state.libraryusers.filter((item) => item.id === new_project.projectUsers)[0]
          new_project.projectUsers = projectUsers

          this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
  }


  searchProject(partedProjectName, filteredData) {
    const headers = this.get_headers()    
    

    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            
            const data = response.data.results
            filteredData = data.filter(element => {
                  return element.projectName.toLowerCase().includes(partedProjectName.toLowerCase());
                   });
            this.setState({projects: filteredData})

        }).catch(error => {
          console.log(error)          
        })
  }


  componentDidMount() {
    this.get_token_from_storage()
  }

   render () {
       return (
           <div>

        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/todos'>ToDos</Link>
              </li>
              <li>
                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
              <p> {this.state.current_user} </p>
            </ul>
          </nav>
          
          <Routes>  
            <Route path='/users' element={<LibraryUserList libraryusers={this.state.libraryusers} />}  />
            <Route path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(uuid)=>this.deleteProject(uuid)} />} />
            <Route path='/todos' element={<TodoList todos={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)} />} />
            <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            <Route path='/projects/:id' element={<ToDoProjectList items={this.state.projects} />} />
            <Route path='/todos/create' element={<ToDoForm project={this.state.projects} todoAuthor={this.state.libraryusers}
                          createToDo={(project, todoText, todoAuthor) => this.createToDo(project, todoText, todoAuthor)} />} />
            <Route path='/projects/create' element={<ProjectForm projectUsers={this.state.libraryusers}
                          createProject={(uuid, projectName, projectUsers) => this.createProject(uuid, projectName, projectUsers)} />} />
            <Route path='/projects/search' element={<ProjectSearchForm 
                          searchProject={(partedProjectName) => this.searchProject(partedProjectName)}/>} />

            
            <Route path="*" element={<Navigate to="/users" />}  />      
          </Routes>

        </BrowserRouter>

           </div>
       )
   }
}

export default App;
