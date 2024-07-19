import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import { useAuthStore } from '../context/store'
import Categories from '../components/Categories'
import Products from '../components/Products'



const Home = () => {


  return (
    <div>
      <Hero />
      <Categories />
      <Hero />
      <Products />

    </div>
  )
}

export default Home
