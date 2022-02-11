import React from 'react'
import { Link } from 'react-router-dom'


const TodoItem = ({todo, deleteTodo}) => {
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
           <td>
               
               <button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
       </tr>
   )
}


const TodoList = ({todos, deleteTodo}) => {
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
            <th>
                
            </th>

            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
            
        </table>
    )
 }
 
 
 export default TodoList;
 