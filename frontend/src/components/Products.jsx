import React, { useEffect, useState } from 'react'
import Product from './props/Product'
import axios from 'axios'


const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BAKCEND_URI}/getProduct`)
        .then((respo) => {
            setProducts(respo.data)
        })
    }, [])
  return (
    <div className='p-10 bg-[#F4F2EE]'>
      <h1 className='italy-font text-6xl '>Latest Products</h1>

      <div className='flex flex-wrap justify-around py-4 '>
      {products && products.map((item, i) => (
        <Product key={i} imgurl={item.images[0]} name={item.name} discount={item.discountedPrice} price={item.price} id={item._id} />  
      ))}      
      </div>
    </div>
  )
}

export default Products
