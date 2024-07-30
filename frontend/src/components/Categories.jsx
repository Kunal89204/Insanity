import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BAKCEND_URI}/getCategory`)
      .then((respo) => {
        setCategories(respo.data)
        console.log(categories)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <>
    <h1 className='italy-font text-center text-5xl py-4'>Explore Our Collections</h1>
    <div className='flex flex-wrap gap-x-28 gap-y-5 p-10 justify-around'>


      {categories && categories.map((cat) => (
        <div className='w-32' key={cat._id}>
          <div className=''><img src={`${cat.images.thumbnail}`} alt="" className='rounded-full aspect-square'/></div>
          <p className='text-center'>{cat.name}</p>
        </div>
      ))}
    
    </div>
    </>
  )
}

export default Categories
