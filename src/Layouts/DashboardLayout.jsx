import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../componet/Dashboard/Sidebar/Menu/Sidebar'

const DashboardLayout = () => {
  return (
    <div>
      <div className=' mx-auto' >
        <Sidebar />
        <main >
          <Outlet />
        </main>

      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default DashboardLayout