import React from 'react'


const ProjectItem = ({project}) => {
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

       </tr>
   )
}


const ProjectList = ({projects}) => {
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

            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
 }
 
 
 export default ProjectList;
