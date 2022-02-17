import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
      super(props)      
      this.state = {project: props.project[0]?.uuid, todoText: '', todoAuthor: props.todoAuthor[0]?.id, updated: Date().toLocaleString()}      
    }
  
    handleChange(event) 
    {    
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );  
    }

    handleSubmit(event) {
        //console.log(this.state.project)
        //console.log(this.state.todoText)
        //console.log(this.state.todoAuthor)
        //console.log(this.state.updated)
        this.props.createToDo(this.state.project, this.state.todoText, this.state.todoAuthor)  
        event.preventDefault()
    }
  
    render() {
      return (
        <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="form-group">
                    <label for="project"> Project</label>
                        <select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.project.map((project)=>
                                <option value={project.uuid}>{project.projectName}</option>)}
                        </select>     
              
              </div>

              <div className="form-group">
                    <label for="todoText"> TodoText</label>
                    <input type="text" className="form-control" name="todoText" value={this.state.todoText} 
                        onChange={(event) => this.handleChange(event)} />
              </div>
              
              <div className="form-group">
                    <label for="todoAuthor"> TodoAuthor</label>
                    <select name="todoAuthor" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.todoAuthor.map((item)=>
                                <option value={item.id}>{item.username}</option>)}
                        </select>            
               </div>
          
                <input type="submit" className="btn btn-primary" value="Save" />

        </form>
      );
    }
  }

  export default ToDoForm
