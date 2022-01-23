import React from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import LibraryUserList from './components/MyUser.js'

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

              <LibraryUserList libraryusers={this.state.libraryusers} />
              <ProjectList projects={this.state.projects} />
              <TodoList todos={this.state.todos} />

           </div>
       )
   }
}

export default App;
