import axios from 'axios'
import React from 'react'
import {useAuthStore} from '../context/store'

const useLogin = () => {
    const {login} = useAuthStore()

    const loginHook = (data, setPopup, setPopupValue) => {
        
        axios.post('http://localhost:8000/api/v1/login', data)
        .then((respo) => {
            if (respo.data.accessToken) {
                console.log(respo.data.accessToken)
                localStorage.setItem('user', JSON.stringify(respo.data))
                login(respo.data)
            }else {
              setPopupValue(respo.data.message);
              setPopup(true);

              setTimeout(() => {
                setPopup(false);
              }, 2000);
              }
        }).catch((error) => {
            console.log(error);
          });
    }
  return {loginHook}
}

export default useLogin
