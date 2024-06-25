import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    video: '',
    discountedPrice: '',
    thumbnail: '',
    category: '',
    description: '',
    owner: '',
    dimensions: { length: '', width: '', height: '', weight: '' },
    stock: '',
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data
    for (const key in formData) {
      if (key === 'dimensions') {
        data.append('dimensions', JSON.stringify(formData.dimensions));
      } else {
        data.append(key, formData[key]);
      }
    }

    // Append images
    for (let i = 0; i < images.length; i++) {
      data.append('img', images[i]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/addProduct', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error adding product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Video URL</label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dimensions</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="length"
              placeholder="Length"
              value={formData.dimensions.length}
              onChange={(e) => handleInputChange({ target: { name: 'dimensions', value: { ...formData.dimensions, length: e.target.value } } })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={formData.dimensions.width}
              onChange={(e) => handleInputChange({ target: { name: 'dimensions', value: { ...formData.dimensions, width: e.target.value } } })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={formData.dimensions.height}
              onChange={(e) => handleInputChange({ target: { name: 'dimensions', value: { ...formData.dimensions, height: e.target.value } } })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight"
              value={formData.dimensions.weight}
              onChange={(e) => handleInputChange({ target: { name: 'dimensions', value: { ...formData.dimensions, weight: e.target.value } } })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default AddProductForm;
