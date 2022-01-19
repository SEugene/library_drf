import React from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import AuthorList from './components/Author.js'
import LibraryUserList from './components/MyUser.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'

class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'authors': [],
           'libraryusers': [],
       }
   }

   componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/authors')
        .then(response => {
            const authors = response.data
                this.setState(
                {
                    'authors': authors
                }
            )
        }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/libraryusers')
        .then(response => {
            const libraryusers = response.data
                this.setState(
                {
                    'libraryusers': libraryusers
                }
            )
        }).catch(error => console.log(error))
 }

   render () {
       return (
           <div>
              <Header />
              <AuthorList authors={this.state.authors} />
              <LibraryUserList libraryusers={this.state.libraryusers} />
              <Footer />
           </div>
       )
   }
}

export default App;
