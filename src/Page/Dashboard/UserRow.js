import React from 'react';

const UserRow = ({users,refetch}) => {
    const {_id,email,role}=users;
    const makeAdmin=()=>{
        fetch(`https://damp-castle-29212.herokuapp.com/user/admin/${email}`, {
  method: 'PUT', // or 'PUT'
  headers: {
    "Content-Type": "application/json",
    authorization:`Bearer ${localStorage.getItem('accessToken')}`
  },
})
.then(res => {
  console.log(res)
    if(res.status===403){
        alert('failed to make an admin')
    }
    return res.json()
})
.then(data => {
  console.log('Success:', data);
  if(data.modifiedCount>0){
    refetch()
    alert('Made an admin successfully')
  }
})
    }
    const handleDelete=id=>{
      fetch(`https://damp-castle-29212.herokuapp.com/user/${id}`,{
        method:'DELETE'
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.deletedCount>0){
          refetch()
    alert('user deleted successfully')
        }
      })
    }
    return (
      <tr>
      <th>1</th>
      <td>{email}</td>
      <td>{
          role !== 'admin' &&<button class="btn border-t-indigo-700 btn-xs" onClick={makeAdmin}>Make Admin</button>
          }</td>
      <td><button onClick={()=>handleDelete(_id)} class="btn border-t-indigo-700 btn-xs">Remove User</button></td>
    </tr>
    );
};

export default UserRow;