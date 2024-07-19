import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Login = () => {
  const { loginHook } = useLogin();
  const [popup, setPopup] = useState(false);
  const [popupValue, setPopupValue] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'customer'
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (!formData.role) validationErrors.role = 'Role is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    loginHook(formData, setPopup, setPopupValue);
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
        <Text fontSize='2xl' fontWeight='bold' mb={6} textAlign='center'>Login</Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
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
            <FormControl isInvalid={errors.role}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  borderColor='gray.300'
                  focusBorderColor='blue.500'
                  width='full'
                >
                  {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleRoleChange('customer')}>Customer</MenuItem>
                  <MenuItem onClick={() => handleRoleChange('admin')}>Admin</MenuItem>
                </MenuList>
              </Menu>
              {errors.role && <Text color='red.500' fontSize='sm'>{errors.role}</Text>}
            </FormControl>
            <Button
              type="submit"
              colorScheme='orange'
              width='full'
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
