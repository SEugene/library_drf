import React from 'react'
import { Link } from 'react-router-dom'


const TodoItem = ({todo}) => {
   return (
       <tr>
           <td>
               <Link to={`/projects/${todo.project}`}>{todo.project}</Link>
           </td>
           <td>
               {todo.todoText}
           </td>
           <td>
               {todo.todoAuthor}
           </td>
           <td>
               {todo.updated}
           </td>
       </tr>
   )
}


const TodoList = ({todos}) => {
    return (
        <table className="table">
            <th>
                Project name
            </th>
            <th>
                Text
            </th>
            <th>
                ToDo Author
            </th>
            <th>
                Updated
            </th>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
 }
 
 
 export default TodoList;
 