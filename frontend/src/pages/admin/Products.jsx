import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div>
      i am products
      <Link to={'/admin/addProducts'}>Add Products</Link>
    </div>
  )
}

export default Products
