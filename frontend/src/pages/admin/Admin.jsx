import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Users from "./Users";
import Products from "./Products";
import AddProducts from "./AddProducts";
import AddCategory from "./AddCategory";
import Categories from './Categories';


const Admin = () => {
  return (
    <div className='bg-gray-50 w-screen  flex'>
      <div className='w-40  bg-gray-100'>
        <ul>
          <li className='py-2 hover:bg-gray-200 pl-5'><Link to="products">Products</Link></li>
          <li className='py-2 hover:bg-gray-200 pl-5'><Link to="users">Users</Link></li>
          {/* {/* <li className='py-2 hover:bg-gray-200 pl-5'><Link to="addProducts">Add Products</Link></li> */}
          <li className='py-2 hover:bg-gray-200 pl-5'><Link to="categories"> Categories</Link></li> 
        </ul>
      </div>

      <main className='flex-1 p-4'>
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="categories" element={<Categories />} />
        </Routes>
      </main>
    </div>
  );
}

export default Admin;
