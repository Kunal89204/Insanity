import React, { useState } from 'react'
import axios from 'axios';

const AddProducts = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState([])
  const [price, setPrice] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/v1/addProduct', { name, price, discountedPrice, description })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}  >
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor=" discountedPrice"> Discounted Price</label>
          <input type="text" onChange={(e) => setDiscountedPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor=" description"> Description</label>
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <div>
            <label htmlFor=" description"> Description</label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor=" description"> Description</label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor=" description"> Description</label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor=" description"> Description</label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="images">Images</label>
          <input type="file" id="images" multiple />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddProducts
