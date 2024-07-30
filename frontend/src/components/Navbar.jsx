import React, { useState, useEffect } from 'react';
import Logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useAuthStore } from '../context/store';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Input,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const { logout, user } = useAuthStore();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BAKCEND_URI}/getCategory`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedCategoryName = categories.find(cat => cat._id === category)?.name || 'Shop By Category';

  return (
    <Box className='flex items-center justify-around p-4 bg-[#F4F2EE] shadow-md'>
      <Box className='w-[16vw]'>
        <Link to={'/'}><Image src={Logo} alt="Logo" className='h-10' /></Link>
      </Box>

      <Box className='relative ml-4 bg-[#f0eadf] py-1 px-1 rounded'>
        <FormControl>
          <Menu bg={'#f0eadf'}>
            <MenuButton as={Button} bg={'#f0eadf'} rightIcon={<ChevronDownIcon />}>
              {selectedCategoryName}
            </MenuButton>
            <MenuList bg={'#f0eadf'}>
              {categories.map((cat, i) => (
                <Link key={i} to={`/category/${cat.name}`}>
                  <MenuItem bg={'#f0eadf'} onClick={() => setCategory(cat._id)}>
                    {cat.name}
                  </MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        </FormControl>
      </Box>

      <HStack spacing={10} px={10}>
        <Link to={'/'}>Home</Link>
        <Link to={'/'}>Shop</Link>
        <Link to={'/'}>Products</Link>
        <Link to={'/'}>About Us</Link>
      </HStack>

      <Box>
        <Input type="text" placeholder='Search' className='bg-white border-gray-300 rounded-lg' />
      </Box>

      <Box className='scale-150'>
        <Link><MdOutlineShoppingBag /></Link>
      </Box>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <FaRegUser />
        </MenuButton>
        <MenuList>
          <Link to={`/profile/${user.username}`}>
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to={`/admin/users`}>
            <MenuItem>Admin</MenuItem>
          </Link>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Navbar;
