import React, { useEffect, useState } from 'react'
import Product from './props/Product'
import axios from 'axios'


const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/getProduct')
        .then((respo) => {
            setProducts(respo.data)
        })
    }, [])
  return (
    <div className='p-10 bg-[#F4F2EE]'>
      <h1 className='italy-font text-6xl '>Latest Products</h1>

      <div className='flex py-4'>
      {products && products.map((item, i) => (
        <Product key={i} imgurl={item.images[0]} name={item.name} discount={item.discountedPrice} price={item.price} />  
      ))}      
      </div>
    </div>
  )
}

export default Products
