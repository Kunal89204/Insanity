import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import { useAuthStore } from '../context/store'
import Categories from '../components/Categories'


const Home = () => {


  return (
    <div>
      <Hero />
      <Categories />
      <Hero />

    </div>
  )
}

export default Home
