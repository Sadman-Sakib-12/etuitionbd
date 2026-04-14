import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../componet/Navbar'
import Footer from '../componet/Footer'
import AIChatbot from '../componet/AIChatbot'

const MainLoyouts = () => {
  return (
    <div className=''>
      <Navbar />
      <div className=' ' >
        <main className='min-h-[calc(100vh-178px)]'>
          <Outlet />
        </main>
      </div>
      <Footer />
      <AIChatbot/>
    </div>
  )
}

export default MainLoyouts
