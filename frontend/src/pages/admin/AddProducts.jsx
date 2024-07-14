import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    // Fetch categories from API
    axios.get('http://localhost:8000/api/v1/getCategory')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      price,
      discountedPrice,
      images,
      video,
      category: selectedCategory,
      description,
      dimensions: { length, width, height, weight },
      stock,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Discounted Price</label>
        <input
          type="number"
          value={discountedPrice}
          onChange={(e) => setDiscountedPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Images</label>
        <input type="file" multiple onChange={handleImageChange} className="p-2 border border-gray-300 rounded-md" />
        <div className="flex space-x-4 mt-4">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Video</label>
        <input type="file" onChange={handleVideoChange} className="p-2 border border-gray-300 rounded-md" />
        {video && (
          <video controls src={video} className="w-full mt-4 rounded-md">
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-semibold text-gray-700">Dimensions</label>
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-600">Length</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-600">Width</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-600">Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-600">Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold text-gray-700">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
