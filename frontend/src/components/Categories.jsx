import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cat from '../assets/Group6.png'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
axios.get('http://localhost:8000/api/v1/getCategory')
.then((respo) => {
  console.log(respo.data)
})
  }, [])
  return (
    <div className='flex flex-wrap gap-x-28 gap-y-5 p-10 justify-around'>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
      <div className='w-32'>
        <div className='border'><img src={cat} alt="" /></div>
        <p className='text-center'>Sofa's</p>
      </div>
    </div>
  )
}

export default Categories
