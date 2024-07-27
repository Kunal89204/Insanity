import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewProduct = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState({ images: [], dimensions: {} });
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/getSingleProduct/${productId}`) 
            .then((response) => {
                setProductData(response.data);
                console.log(response.data)
                setMainImage(response.data.images[0] || 'fallback-image-url'); // Set initial main image
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    return (
        <div>
            <div className='flex'>
                <div className='w-1/2 p-10'>
                    <div className='w-full'>
                        <img
                            src={mainImage}
                            alt="Main Product"
                            className='rounded-3xl '
                        />
                    </div>

                    <div className='grid grid-cols-4 p-2 px-8 gap-2 w-full'>
                        {productData.images && productData.images.length > 0 ? (
                            productData.images.map((image, index) => (
                                <div
                                    key={index}
                                    className='w-28 h-28'
                                >
                                    <img
                                        src={image}
                                        alt={`Image ${index}`}
                                        className='rounded-xl cursor-pointer'
                                        onClick={() => handleThumbnailClick(image)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>No images available</div>
                        )}
                    </div>
                </div>
                <div className='w-1/2 p-10'>
                    <div className='border border-yellow-600 p-4 rounded-xl'>
                        <div className='text-sm'>
                            <span className='text-yellow-400'>Category:</span> {productData.category.name}
                        </div>
                        <div className='text-4xl italy-font py-2'>{productData.name}</div>
                        <div className='text-xl flex gap-4'>
                            <del className='text-gray-500 inria-sans-light'>Rs {productData.price}</del><span>Rs {productData.discountedPrice
                            }</span>
                        </div>
                        <div className='text-green-600 py-2'>{productData.stock} in stock</div>
                        <hr />
                        <div className='py-5 inria-sans-light text-lg'>
                            {productData.description}
                        </div>
                        <hr />
                        <div className='flex items-center gap-5 py-4'>
                            <div className='text-2xl'>Quantity</div>
                            <div className='flex gap-5 justify-between py-2'>
                                <button className="bg-[#AD8C5C] text-white rounded-full py-2 px-5">Add To Cart</button>
                                <div className='bg-[#E5DAB1] px-2 rounded-full flex text-lg items-center text-white'>
                                    <button className='p-2' onClick={decrement}>-</button>
                                    <span className='px-4'>{quantity}</span>
                                    <button className='p-2' onClick={increment}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='py-4'>
                            <div className='text-2xl font-semibold'>Dimensions</div>
                            <div className='grid grid-cols-2 gap-2 py-2'>
                                <div className='bg-gray-100 p-2 rounded-lg'>
                                    <div className='text-lg font-medium'>Length</div>
                                    <div>{productData.dimensions.length || 'N/A'}cm</div>
                                </div>
                                <div className='bg-gray-100 p-2 rounded-lg'>
                                    <div className='text-lg font-medium'>Height</div>
                                    <div>{productData.dimensions.height || 'N/A'}cm</div>
                                </div>
                                <div className='bg-gray-100 p-2 rounded-lg'>
                                    <div className='text-lg font-medium'>Width</div>
                                    <div>{productData.dimensions.width || 'N/A'}cm</div>
                                </div>
                                <div className='bg-gray-100 p-2 rounded-lg'>
                                    <div className='text-lg font-medium'>Weight</div>
                                    <div>{productData.dimensions.weight || 'N/A'}Kg</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='font-semibold'>Tags:</div> 
                            {productData && productData.category.subCategories.map((t, i) => <span className='py-4' key={i}>{t},</span>)}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='border'>

                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
