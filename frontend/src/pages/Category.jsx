import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../hooks/fetchData'
import { useAuthStore } from '../context/store'




const Category = () => {
    const {name} = useParams()
    const {user} = useAuthStore()
 
    const [catInfo, setCatInfo] = useState({})

    const fetchCategoryInfo = async () => {
      try {
        const response = await fetchData.getCategoryInfo(user?.accessToken, name)
     setCatInfo(response)
      } catch (error) {
        consoel.log(error)
      }
    }

    useEffect(() => {
      fetchCategoryInfo()
    }, [name])
  return (
    <div>
      <div className='relative'><img className='h-[60vh] w-full m-auto' src={catInfo?.images?.thumbnail} alt="" />
      <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl'>{catInfo?.name}</p>
      </div>
    </div>
  )
}

export default Category
