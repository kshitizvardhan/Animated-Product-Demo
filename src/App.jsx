import React from 'react'
import Navbar from './Components/Navbar'
import Highlights from './Components/Highlights'
import Hero from './Components/Hero'

const App = () => {
  return (
    <main className='bg-black'>
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  )
}

export default App