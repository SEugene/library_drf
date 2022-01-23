import React from 'react'


const LibraryUserItem = ({libraryuser}) => {
   return (
       <tr>
           <td>
               {libraryuser.username}
           </td>
           <td>
               {libraryuser.firstname}
           </td>
           <td>
               {libraryuser.lastname}
           </td>
           <td>
               {libraryuser.email}
           </td>
       </tr>
   )
}


const LibraryUserList = ({libraryusers}) => {
return (
<table>
<th>
    Username
</th>
<th>
    First name
</th>
<th>
    Last Name
</th>
<th>
    Email
</th>
{libraryusers.map((libraryuser) => <LibraryUserItem libraryuser={libraryuser} />)}
</table>
)
}


export default LibraryUserList;
