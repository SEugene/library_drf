import React from 'react'
import { useParams } from 'react-router-dom'

const ToDoProjectItem = ({item}) => {
    return (
        <tr>            
            <td>{item.projectName}</td>
            <td>{item.repository}</td>
            <td>{item.projectUsers}</td>
        </tr>
    )
}


const ToDoProjectList = ({items}) => {

    let ProjectId = useParams().id;
    let filtered_items = items.filter((item) => item.uuid == ProjectId)

    return (
        <table>
            <tr>
                <th>NAME</th>
                <th>REPOSITORY</th>
                <th>PROJECT USERS</th>
            </tr>
            {filtered_items.map((item) => <ToDoProjectItem item={item} />)}
        </table>
    )
}

export default ToDoProjectList;


