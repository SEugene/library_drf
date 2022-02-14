import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({project, deleteProject,searchProject}) => {
   return (
       <tr>
           <td>
               {project.projectName}
           </td>
           <td>
               {project.repository}
           </td>
           <td>
               {project.projectUsers}
           </td>
           <td>               
               <button onClick={()=>deleteProject(project.uuid)} type='button'>Delete</button>
            </td>

       </tr>
   )
}


const ProjectList = ({projects, deleteProject, searchProject}) => {
    return (
        <div>
        <table className="table">
            <th>
                Project name
            </th>
            <th>
                Repository
            </th>
            <th>
                Project Users
            </th>

            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
            
            <Link to='/projects/create'>Create</Link>
            <p></p>
            <Link to='/projects/search'>Search for Project Name includes...</Link>
            
        
        </div>
    )
 }
 
 
 export default ProjectList;
