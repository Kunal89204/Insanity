import axios from 'axios';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const AddCategory = () => {
  const [name, setName] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const toast = useToast();

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    setFile(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subCategoriesArray = subCategories.split(",").map(subCategory => subCategory.trim());

    const formData = new FormData();
    formData.append('name', name);
    formData.append('subCategories', JSON.stringify(subCategoriesArray)); // Append the array as a JSON string
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('banner', banner);

    // Show a loading toast
    toast.promise(
      axios.post('http://localhost:8000/api/v1/addCategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
      {
        loading: {title:"Creating a new category"},
        success: {
          title: "Success",
          description: "New category has been created",
        },
        error: {
          title: "Error",
          description: "There was an error adding the new category",
        }
      }
    ).then((response) => {
      console.log('Category added:', response.data);
    }).catch((error) => {
      console.error('Error adding category:', error);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
        <h1 className="text-4xl font-bold text-center mb-6">Add Category</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="subcategories" className="block text-sm font-medium text-gray-700">Subcategories</label>
            <input
              type="text"
              id="subcategories"
              value={subCategories}
              onChange={(e) => setSubCategories(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail</label>
            <input
              type="file"
              id="thumbnail"
              className="hidden"
              onChange={(e) => handleFileChange(e, setThumbnail, setThumbnailPreview)}
            />
            <label
              htmlFor="thumbnail"
              className="inline-block cursor-pointer bg-[#f1d39a] py-2 px-6 rounded-lg "
            >
              Choose File
            </label>
            {thumbnail && <p className="mt-2 text-sm text-center text-gray-600">Selected File: {thumbnail.name}</p>}
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-4 max-w-xs mx-auto border rounded shadow-lg"
              />
            )}
          </div>
          <div>
            <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Banner</label>
            <input
              type="file"
              id="banner"
              className="hidden"
              onChange={(e) => handleFileChange(e, setBanner, setBannerPreview)}
            />
            <label
              htmlFor="banner"
              className="inline-block cursor-pointer bg-[#f1d39a] py-2 px-6 rounded-lg "
            >
              Choose File
            </label>
            {banner && <p className="mt-2 text-sm text-center text-gray-600">Selected File: {banner.name}</p>}
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-4 max-w-xs mx-auto border rounded shadow-lg"
              />
            )}
          </div>

          <button type="submit" className='bg-[#f1d39a] py-2 px-6 rounded-lg'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
