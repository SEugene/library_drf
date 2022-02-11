import React from 'react'


const ProjectItem = ({project, deleteProject}) => {
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


const ProjectList = ({projects, deleteProject}) => {
    return (
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
    )
 }
 
 
 export default ProjectList;
