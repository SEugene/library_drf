import React from 'react'
import {Link} from 'react-router-dom'


class ProjectSearchForm extends React.Component {
    constructor(props) {
      super(props)      
      this.state = {partedProjectName: '', filteredData: []}      
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
        this.props.searchProject(this.state.partedProjectName, this.state.filteredData)
        event.preventDefault()
    }
  
    render() {
      return (
        <div>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                  <div className="form-group">
                        <label for="partedProjectName"> ProjectName</label>
                        <input type="text" className="SearchInput" name="partedProjectName" value={this.state.partedProjectName} 
                            onChange={(event) => this.handleChange(event)} />     
                  
                  </div>   
                                        
                    <input type="submit" className="btn btn-primary" value="Search" />
                    <p></p>
                    <Link to='/projects'>  Search Results </Link>
                    
            </form>

        </div>          
      
      );
    }
  }

  export default ProjectSearchForm
  