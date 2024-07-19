import React, { useState } from 'react'

const Product = ({imgurl, name, discount, price}) => {

    const [quantity, setQuantity] = useState(0)

    const increment = () => {
        setQuantity(quantity+1)
    }
    const decrement = () => {
        setQuantity(quantity-1)
    }

    if (quantity <= -1) {
        setQuantity(0)
    }
  return (
    <div className='w-1/4 bg-white p-4 shadow-md rounded-3xl'>
            <p className='italy-font'>Sofa</p>
            <div><img src={`http://localhost:8000/uploads/${imgurl}`} className='rounded-3xl' alt="" /></div>
            <div>
                <strong className='italy-font text-xl'>{name}</strong>
                <div className='inria-sans-light flex gap-2 py-1 '>
                    <span className='line-through text-gray-500'>Rs. {price}</span>
                    <span>Rs. {discount}</span>
                </div>
                <div className='flex justify-between py-2'>
                    <button className="bg-[#AD8C5C] text-white rounded-full py-2 px-5">Add To Cart</button>
                    <div className='bg-[#E5DAB1] px-2 rounded-full flex text-lg items-center text-white'>
                        <button className='p-2' onClick={decrement}>-</button>
                        <span className='px-4'>{quantity}</span>
                        <button className='p-2' onClick={increment}>+</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Product
