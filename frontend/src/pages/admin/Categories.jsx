import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        axios.get(`${import.meta.env.VITE_BAKCEND_URI}/getCategory`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, []); // Empty array means this effect runs once, equivalent to componentDidMount

    const handleDelete = (id, bannerId, thumbnailId) => {
        axios.delete('http://localhost:8000/api/v1/deleteCategory', {
            data: {
                id,
                bannerId,
                thumbnailId
            }
        })
        .then(() => {
            fetchCategories(); // Fetch categories again after successful delete
        })
        .catch((error) => {
            console.error('Error deleting category:', error);
        });
    };
    
    

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/admin/addCategory">
                <button className="bg-[#f7ceb3] py-2 px-6 rounded text-gray-600">Add Categories</button>
            </Link>
            <h1 className="text-3xl font-bold mb-4">Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category._id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                        <img src={`${category.images.banner}`} alt={category.name} className="w-full h-40 object-cover" />
                        <div className="absolute top-28 left-4">
                            <img src={`${category.images.thumbnail}`} alt={`${category.name} thumbnail`} className="w-16 h-16 rounded-full border-2 border-white" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                            <p className="text-gray-600 mb-4 overflow-hidden overflow-ellipsis line-clamp-3">{category.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {category.subCategories.map((subCategory) => (
                                    <span key={subCategory} className="bg-gray-200 px-2 py-1 rounded-md text-sm">{subCategory}</span>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <Link to={`/category/${category._id}`} className="text-black py-1 px-6 rounded bg-[#F4F2EE] hover:underline">Edit Category</Link>
                                <button onClick={() => handleDelete(category._id, category.images.banner, category.images.thumbnail)} className="text-white py-1 px-6 rounded bg-red-600 hover:underline">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
