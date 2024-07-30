import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../../components/Popup'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  VStack,
  HStack,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const AddProducts = () => {
  const [popup, setPopup] = useState(false)
  const [popupValue, setPopupValue] = useState("")
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');


  const toast = useToast()
  const [dimensions, setDimensions] = useState({
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
  });
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState("");
  const selectedCategoryName = categories.find(cat => cat._id === category)?.name || 'Select Category';
  
  
     
   
  

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BAKCEND_URI}/getCategory`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (name !== "" && price !== 0) {
      // setSpinner(true);
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('discountedPrice', discountedPrice);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('dimensions', JSON.stringify(dimensions));
    formData.append('category', category);
    formData.append('video', video);
    images.forEach(image => formData.append('images', image));
  
    const addProductPromise = axios.post('http://localhost:8000/api/v1/addProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    toast.promise(addProductPromise, {
      loading: { title: 'Submitting', description: 'Please wait while we add your product.' },
      success: { title: 'Product Added', description: 'Your product has been added successfully.' },
      error: { title: 'Error', description: 'There was an error adding your product.' },
    });
  
    addProductPromise
      .then(response => {
        console.log('Product added successfully:', response.data);
        // setSpinner(false);
      })
      .catch(error => {
        console.error('Error adding product:', error.response?.data?.message || error.message);
        setPopupValue(error.response?.data?.message || error.message);
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 2500);
      });
  };
  return (
    <Box maxW="2xl" mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
        {popup && <Popup value={popupValue} />}
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <NumberInput value={price} onChange={(value) => setPrice(value)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Discounted Price</FormLabel>
            <NumberInput value={discountedPrice} onChange={(value) => setDiscountedPrice(value)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <NumberInput value={stock} onChange={(value) => setStock(value)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <HStack spacing="4" w="full">
            <FormControl>
              <FormLabel>Length</FormLabel>
              <NumberInput value={dimensions.length} onChange={(value) => handleDimensionChange({ target: { name: 'length', value } })}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Width</FormLabel>
              <NumberInput value={dimensions.width} onChange={(value) => handleDimensionChange({ target: { name: 'width', value } })}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </HStack>
          <HStack spacing="4" w="full">
            <FormControl>
              <FormLabel>Height</FormLabel>
              <NumberInput value={dimensions.height} onChange={(value) => handleDimensionChange({ target: { name: 'height', value } })}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <NumberInput value={dimensions.weight} onChange={(value) => handleDimensionChange({ target: { name: 'weight', value } })}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </HStack>
          <FormControl>
      <FormLabel>Category</FormLabel>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedCategoryName}
        </MenuButton>
        <MenuList>
          {categories.map((cat, i) => (
            <MenuItem key={i} onClick={() => setCategory(cat._id)}>
              {cat.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>

          <FormControl>
            <FormLabel>Images</FormLabel>
            <Input type="file" multiple onChange={handleImageChange} />
            <HStack spacing="4" mt="4" wrap="wrap">
              {imagePreviews.map((src, i) => (
                <Image key={i} src={src} boxSize="100px" objectFit="cover" borderRadius="md" />
              ))}
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Video</FormLabel>
            <Input type="file" onChange={handleVideoChange} />
            {videoPreview && (
              <Box mt="4">
                <Text>Video Preview:</Text>
                <video src={videoPreview} controls width="100%" />
              </Box>
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue" w="full">Submit </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProducts;
