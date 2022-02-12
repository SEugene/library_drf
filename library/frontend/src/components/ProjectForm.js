import React from 'react'
import {v4 as UUID} from 'uuid'


class ProjectForm extends React.Component {
    constructor(props) {
      super(props)      
      this.state = {uuid: '', projectName: '', projectUsers: []}      
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
        //console.log(this.state.uuid)
        //console.log(this.state.projectName)
        //console.log(this.state.projectUsers)
        
        this.props.createProject(this.state.uuid, this.state.projectName, this.state.projectUsers)  
        event.preventDefault()
    }
  
    render() {
      return (
        <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="form-group">
                    <label for="projectName"> ProjectName</label>
                    <input type="text" className="form-control" name="projectName" value={this.state.projectName} 
                        onChange={(event) => this.handleChange(event)} />    
              
              </div>       
              <div className="form-group">
                    <label for="projectUsers"> projectUsers</label>
                    <select name="projectUsers" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.projectUsers.map((item)=>
                                <option value={item.id}>{item.username}</option>)}
                        </select>            
               </div>     

          
                <input type="submit" className="btn btn-primary" value="Save" />

        </form>
      );
    }
  }

  export default ProjectForm
