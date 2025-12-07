import React from 'react'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
     <div>
    <div className='max-w-11/12 mx-auto' >
      {/* <Navbar/> */}
      <main className='min-h-[calc(100vh-178px)]'>
        <Outlet/>
      </main>
     
    </div>
     {/* <Footer/> */}
     </div>
  )
}

export default DashboardLayout