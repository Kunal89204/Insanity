import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';


const Login = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false)
  const [popupValue, setPopupValue] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'customer'
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (!formData.role) validationErrors.role = 'Role is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:8000/api/v1/login', formData)
      .then((respo) => {

        console.log(respo.data)
        
        if (respo.data.userId) {
          console.log(respo.data.userId);

          if (respo.data.role === 'admin') {
            navigate('/admin')
          }else{
            localStorage.setItem('NexMartUserId', respo.data.userId);
          navigate('/');
          }
          
          
        }else if (respo.data.message){
          setPopupValue(respo.data.message)
          setPopup(true)
          
          setTimeout(() => {
            
            setPopup(false)
          }, 2000);
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='bg-[#F4F2EE] h-screen flex items-center justify-center'>
      {popup && <Popup value={popupValue} />}
      <div className='bg-[#f0eadf] p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              value={formData.username}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="role" className='block text-sm font-medium text-gray-700'>Role</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className='text-red-500 text-xs mt-1'>{errors.role}</p>}
          </div>
          <div className='mt-6'>
            <button 
              type="submit" 
              className='w-full bg-orange-300 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
