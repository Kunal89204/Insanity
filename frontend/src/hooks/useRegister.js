import axios from 'axios'
import React from 'react'
import {useAuthStore} from '../context/store'

const useRegister = () => {
    const {login}  = useAuthStore()

    const registerHook = (data) => {
        axios.post(`${import.meta.env.VITE_BAKCEND_URI}/register`, data)
        .then((respo) => {
            console.log(respo.data)
            localStorage.setItem('user', JSON.stringify(respo.data))
            login(respo.data)
        })
        .catch((error) => {
            console.log(error);
          });
    
    }
  return {registerHook}
}

export default useRegister
