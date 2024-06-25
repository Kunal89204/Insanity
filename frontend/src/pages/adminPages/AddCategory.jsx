import React, { useState } from 'react';
import axios from 'axios';
import { HiOutlinePhotograph } from 'react-icons/hi';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [banner, setBanner] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState('');
  const [previewBanner, setPreviewBanner] = useState('');
  const [subcategories, setSubcategories] = useState('')
  const [subcategoriesArr, setSubcategoriesArr] = useState([])

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBanner(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubCategories = (e) => {
    const val = e.target.value;
    setSubcategories(val);
    
    // Split the input value by commas
    const myarr = val.split(',');

    // Filter out empty strings from the array
    const filteredArr = myarr.filter(item => item.trim() !== '');

    setSubcategoriesArr(filteredArr);
    console.log(filteredArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);
      formData.append('banner', banner);
      formData.append('subcategories', JSON.stringify(subcategoriesArr)); // Send as JSON string

      const response = await axios.post('http://localhost:8000/api/v1/addCategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      // Handle success or update UI
    } catch (error) {
      console.error('Error adding category:', error);
      // Handle error or display error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="subcategories" className="block text-sm font-medium text-gray-700">
            Sub Categories
          </label>
          <input
            type="text"
            id="subcategories"
            name="subcategories"
            value={subcategories}
            onChange={handleSubCategories}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <small className="text-gray-500">Enter subcategories separated by commas</small>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer">
              <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                <HiOutlinePhotograph className="inline-block mr-2" /> Choose Thumbnail
              </span>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </label>
            {previewThumbnail && (
              <div className="ml-4">
                <img src={previewThumbnail} alt="Thumbnail Preview" className="w-24 h-24 object-cover rounded-lg shadow-lg" />
              </div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="banner" className="block text-sm font-medium text-gray-700">
            Banner
          </label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer">
              <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                <HiOutlinePhotograph className="inline-block mr-2" /> Choose Banner
              </span>
              <input
                type="file"
                id="banner"
                name="banner"
                accept="image/*"
                onChange={handleBannerChange}
                className="hidden"
              />
            </label>
            {previewBanner && (
              <div className="ml-4">
                <img src={previewBanner} alt="Banner Preview" className="w-24 h-24 object-cover rounded-lg shadow-lg" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
