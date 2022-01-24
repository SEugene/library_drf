import React from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import LibraryUserList from './components/MyUser.js'
import ToDoProjectList from './components/ToDoProject.js'

import {HashRouter, Route, Routes, Link, Navigate} from 'react-router-dom'

class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           projects: [],
           libraryusers: [],
           todos: []
       }
   }

   componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
            //const authors = response.data
                this.setState(
                {
                    projects: response.data.results
                }
            )
        }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/libraryusers')
        .then(response => {
            //const libraryusers = response.data
                this.setState(
                {
                    libraryusers: response.data.results
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos')
        .then(response => {
            //const libraryusers = response.data
                this.setState(
                {
                    todos: response.data.results
                }
            )
        }).catch(error => console.log(error))
 }

   render () {
       return (
           <div>

        <HashRouter>
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
            </ul>
          </nav>
          
          <Routes>  
            <Route path='/users' element={<LibraryUserList libraryusers={this.state.libraryusers} />}  />
            <Route path='/projects' element={<ProjectList projects={this.state.projects} />} />
            <Route path='/todos' element={<TodoList todos={this.state.todos} />} />
            <Route path='/projects/:id' element={<ToDoProjectList items={this.state.projects} />} />
            <Route path="*" element={<Navigate to="/users" />}  />
            
            
          </Routes> 

          
        </HashRouter>

           </div>
       )
   }
}

export default App;
