import React from 'react'
import Navbar from './Components/Navbar'
import Highlights from './Components/Highlights'
import Hero from './Components/Hero'
import Model from './Components/Model'
import Features from './Components/Features'
import HowItWorks from './Components/HowItWorks'
import Footer from './Components/Footer'

const App = () => {
  return (
    <main className='bg-black'>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App