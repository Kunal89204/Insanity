import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../context/store';

const Users = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuthStore();

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/getUsers", {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                role: user.role
            }
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, []);

    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:8000/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(() => {
            // Remove deleted user from state or reload users
            // Example: fetchUsers();
            console.log(`User ${userId} deleted successfully.`);
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Users</h1>
            <div className="overflow-x-auto">
                <table className="border w-full text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>Username</th>
                            <th>Profile Image</th>
                            <th>Role</th>
                            <th>Age</th>
                            <th>Orders</th>
                            <th>Joined</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user) => (
                            <tr key={user._id} className="border-b py-2">
                                <td>{user.username}</td>
                                <td className="w-20 h-20">
                                    <img src={`http://localhost:8000/uploads/${user.profileImg}`} alt={user.username} className="w-full h-full object-cover rounded-full" />
                                </td>
                                <td>{user.role}</td>
                                <td>{user.age}</td>
                                <td>{user.orders.length}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/user/${user._id}`} className="text-blue-600 hover:underline mr-2">View Profile</Link>
                                    <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
