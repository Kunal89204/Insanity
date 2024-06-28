import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import { Link } from 'react-router-dom'
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useAuthStore } from '../context/store';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout, user } = useAuthStore()


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(false); // Close dropdown after click (optional)
    // Additional logic for profile link click
  };

  const handleSelect = (category) => {
    console.log(`Selected category: ${category}`);
    setIsOpen(false);
  };

  return (
    <div className='flex items-center justify-around p-4 bg-[#F4F2EE] shadow-md'>

      <div className='w-[18vw]'>
        <Link to={'/'}><img src={Logo} alt="Logo" className='h-10' /></Link>
      </div>

      <div className='relative ml-4 bg-[#f0eadf] py-2 px-6 rounded'>
        <div className='flex items-center cursor-pointer' onClick={toggleDropdown}>
          <button>Shop By Category</button>
          <svg
            className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        {isOpen && (
          <ul className="absolute mt-2 bg-[#f1eee8]  border border-gray-300 rounded-md shadow-lg z-10 w-48">
            <li
              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
              onClick={() => handleSelect('Electronics')}
            >
              Electronics
            </li>
            <li
              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
              onClick={() => handleSelect('Clothing')}
            >
              Clothing
            </li>
            <li
              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
              onClick={() => handleSelect('Home & Kitchen')}
            >
              Home & Kitchen
            </li>
            <li
              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
              onClick={() => handleSelect('Books')}
            >
              Books
            </li>
          </ul>
        )}
      </div>


      <nav className='flex gap-10 px-10'>
        <div><Link to={'/'}>Home</Link></div>
        <div><Link to={'/'}>Shop</Link></div>
        <div><Link to={'/'}>Products</Link></div>
        <div><Link to={'/'}>About Us</Link></div>
      </nav>


      <div>
        <input type="text" placeholder='Search' className='bg-white border-gray-300 rounded-lg' />
      </div>


      <div className='scale-150'>
        <Link><MdOutlineShoppingBag /></Link>
      </div>

      <div className='relative'>
        <button onClick={toggleProfileDropdown}>
          <FaRegUser />
        </button>

        <div className={`absolute border ${isProfileOpen?'block':'hidden'} bg-[#F4F2EE] right-0 rounded p-4 shadow shadow-black`}>
          <Link to={`/profile/${user.username}`}><div className='border-b px-6 pb-2' onClick={handleProfileClick}>Profile</div></Link>
          <div onClick={logout} className='cursor-pointer px-6 pt-2' >Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
