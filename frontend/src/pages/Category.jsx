import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Category = () => {
    const {name} = useParams()
    const [catInfo, setCatInfo] = useState({})

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BAKCEND_URI}/eachCategory/${name}`)
      .then((respo) => {
        setCatInfo(respo.data)
      })
    })
  return (
    <div>
      <div ><img className='h-60 w-full m-auto' src="https://www.shutterstock.com/image-illustration/interior-design-concept-sale-home-260nw-2176522145.jpg" alt="" /></div>
    </div>
  )
}

export default Category
