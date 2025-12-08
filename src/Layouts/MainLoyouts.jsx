import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../componet/Navbar'
import Footer from '../componet/Footer'

const MainLoyouts = () => {
  return (
    <div>
      <div className='max-w-11/12 mx-auto' >
        <Navbar />
        <main className='min-h-[calc(100vh-178px)]'>
          <Outlet />
        </main>

      </div>
      <Footer />
    </div>
  )
}

export default MainLoyouts
