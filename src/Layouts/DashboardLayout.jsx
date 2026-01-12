import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../componet/Dashboard/Sidebar/Menu/Sidebar'
import Navbar from '../componet/Navbar'

const DashboardLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className='relative min-h-screen md:flex ' >
        <Sidebar />
        <main className='flex-1' >
          <Outlet />
        </main>

      </div>
      
    </div>
  )
}

export default DashboardLayout