import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../componet/Dashboard/Sidebar/Menu/Sidebar'

const DashboardLayout = () => {
  return (
    <div>
      <div className='relative min-h-screen md:flex bg-white' >
        <Sidebar />
        <main className='flex-1' >
          <Outlet />
        </main>

      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default DashboardLayout