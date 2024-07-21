import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Grid, Heading, Image, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get('http://localhost:8000/api/v1/getProduct')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const handleDelete = (id, images, video) => {
    
    axios.delete(`http://localhost:8000/api/v1/deleteProduct/${id}`, {
      data: {
        images, 
        video
      }
    })
      .then(() => {
        fetchProducts(); // Fetch products again after successful delete
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <Flex mb={6} justify="space-between" align="center">
        <Heading size="lg">Products</Heading>
        <Link to="/admin/addProducts">
          <Button colorScheme="teal">Add Product</Button>
        </Link>
      </Flex>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {products.map((product) => (
          <Box
            key={product._id}
            borderWidth={1}
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            position="relative"
          >
            <Image
              src={`${product.images[0]}`}
              alt={product.name}
              objectFit="cover"
              boxSize="100%"
              height={{ base: '200px', md: '250px' }}
            />
            <VStack p={4} spacing={3} align="start">
              <Heading size="md">{product.name}</Heading>
              <Text color="gray.600" noOfLines={3}>{product.description}</Text>
              <Text fontWeight="bold">Price: ₹{product.price}</Text>
              <Text color="gray.500">Discounted Price: ₹{product.discountedPrice}</Text>
              <Flex justify="space-between" w="full">
                <Link to={`/product/${product._id}`}>
                  <Button colorScheme="blue">View Details</Button>
                </Link>
                <Button colorScheme="red" onClick={() => handleDelete(product._id, product.images, product.video)}>Delete</Button>
              </Flex>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};



export default Products;
