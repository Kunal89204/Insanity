import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'


const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {

    if (!localStorage.getItem('NexMartUserId')) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Hero />
    </div>
  )
}

export default Home
