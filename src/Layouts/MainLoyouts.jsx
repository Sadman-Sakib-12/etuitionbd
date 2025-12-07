import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Pages/Navbar'
import Footer from '../Pages/Footer'

const MainLoyouts = () => {
  return (
    <div>
    <div className='max-w-11/12 mx-auto' >
      <Navbar/>
      <main className='min-h-[calc(100vh-178px)]'>
        <Outlet/>
      </main>
     
    </div>
     <Footer/>
     </div>
  )
}

export default MainLoyouts








// import React from 'react'

// import { Outlet } from 'react-router'

// import { Toaster } from 'react-hot-toast'
// import Navbar from '../Pages/Navbar'

// const MainLoyouts = () => {
//   return (
//     <div className='max-w-7xl mx-auto ' >
//         <Navbar/>
//         <main className='min-h-[calc(100vh-178px)]'> 
//             <Outlet/>
//             <Toaster position='top-right'/>
//         </main>
//     </div>
//   )
// }

// export default MainLoyouts