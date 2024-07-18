import React, { useState } from 'react'
import axios from 'axios';

const AddProducts = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}  >
       <div>
       <label htmlFor="name">Name</label>
       <input type="text" onChange={(e) => setName(e.target.value)}  />
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
