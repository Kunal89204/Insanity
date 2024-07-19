import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../context/store';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Button,
  Flex,
  useToast
} from '@chakra-ui/react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthStore();
  const toast = useToast();

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/getUsers", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        role: user.role
      }
    })
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, [user.accessToken, user.role]);

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:8000/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
    .then(() => {
      setUsers(users.filter((user) => user._id !== userId));
      toast({
        title: `User ${userId} deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error deleting user.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <Box p={4} maxW='1200px' mx='auto'>
      <Text fontSize='3xl' fontWeight='bold' mb={4}>Users</Text>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Profile Image</Th>
              <Th>Role</Th>
              <Th>Age</Th>
              <Th>Orders</Th>
              <Th>Joined</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.username}</Td>
                <Td>
                  <Image
                    src={`http://localhost:8000/uploads/${user.profileImg}`}
                    alt={user.username}
                    boxSize='80px'
                    objectFit='cover'
                    borderRadius='full'
                  />
                </Td>
                <Td>{user.role}</Td>
                <Td>{user.age}</Td>
                <Td>{user.orders.length}</Td>
                <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <Flex direction='row' gap={2} align='center'>
                    <Button
                      as={Link}
                      to={`/user/${user._id}`}
                      colorScheme='blue'
                      variant='outline'
                      size='sm'
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(user._id)}
                      colorScheme='red'
                      variant='outline'
                      size='sm'
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
