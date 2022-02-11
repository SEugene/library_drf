import React from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {BrowserRouter, Route, Routes, Link, Navigate} from 'react-router-dom';

import './App.css';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import LibraryUserList from './components/MyUser.js';
import ToDoProjectList from './components/ToDoProject.js';
import LoginForm from './components/Auth.js'


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
            <Route path='/projects' element={<ProjectList projects={this.state.projects} />} />
            <Route path='/todos' element={<TodoList todos={this.state.todos} />} />
            <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            <Route path='/projects/:id' element={<ToDoProjectList items={this.state.projects} />} />
            <Route path="*" element={<Navigate to="/users" />}  />      
          </Routes>

        </BrowserRouter>

           </div>
       )
   }
}

export default App;
