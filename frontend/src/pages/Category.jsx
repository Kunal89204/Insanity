import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Category = () => {
    const {name} = useParams()
    const [catInfo, setCatInfo] = useState({})

    useEffect(() => {
      axios.get(`http://localhost:8000/api/v1/eachCategory/${name}`)
      .then((respo) => {
        setCatInfo(respo.data)
      })
    })
  return (
    <div>
      <div ><img className='h-60 w-full m-auto' src="https://t4.ftcdn.net/jpg/05/08/17/01/360_F_508170187_4Oonk4IG8u9eyfwSUvTASkT8hl71vRX2.jpg" alt="" /></div>
    </div>
  )
}

export default Category
