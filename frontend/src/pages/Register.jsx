import React, { useState } from 'react';
import useRegister from '../hooks/useRegister';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';

const Register = () => {
  const { registerHook } = useRegister();
  const [popup, setPopup] = useState(false);
  const [popupValue, setPopupValue] = useState("");
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    fullname: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.fullname) validationErrors.fullname = 'Fullname is required';
    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerHook(formData, setPopup, setPopupValue);
  };

  return (
    <Box bg='#F4F2EE' h='100vh' display='flex' alignItems='center' justifyContent='center'>
      {popup && (
        <Alert status='error' position='fixed' top={4} width='80%' maxWidth='md' zIndex={1}>
          <AlertIcon />
          {popupValue}
        </Alert>
      )}
      <Box bg='#f0eadf' p={8} rounded='lg' shadow='md' w='full' maxW='md'>
        <Text fontSize='2xl' fontWeight='bold' mb={6} textAlign='center'>Register</Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.fullname}>
              <FormLabel htmlFor="fullname">Fullname</FormLabel>
              <Input
                type="text"
                name="fullname"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                borderColor='gray.300'
                focusBorderColor='blue.500'
              />
              {errors.fullname && <Text color='red.500' fontSize='sm'>{errors.fullname}</Text>}
            </FormControl>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                borderColor='gray.300'
                focusBorderColor='blue.500'
              />
              {errors.username && <Text color='red.500' fontSize='sm'>{errors.username}</Text>}
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                borderColor='gray.300'
                focusBorderColor='blue.500'
              />
              {errors.password && <Text color='red.500' fontSize='sm'>{errors.password}</Text>}
            </FormControl>
            <Button
              type="submit"
              colorScheme='orange'
              width='full'
            >
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
