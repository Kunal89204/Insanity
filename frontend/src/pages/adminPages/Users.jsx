import axios from 'axios';
import React, {useState, useEffect} from 'react'


const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:8000/api/v1/getUsers")
        .then((respo) => [setUsers(respo.data)]);
    }, []);

  return (
    <div>
      <table className='border w-full text-center'>
        <tr>
            <th>username</th>
            <th>profile img</th>
            <th>role</th>
            <th>age</th>
            <th>orders</th>
            <th>joined</th>
            <th>operations</th>
        </tr>
        {users && users.map((user) => (
            <tr className='border-b py-2'>
                <td>{user.username}</td>
                <td className='w-20 h-20'><img src={`http://localhost:8000/uploads/${user.profileImg}`} alt="" /></td>
                <td>{user.role}</td>
                <td>{user.age}</td>
                <td>{user.orders.length}</td>
                <td>{user.createdAt}</td>
            </tr>
        ))}
      </table>
    </div>
  )
}

export default Users
