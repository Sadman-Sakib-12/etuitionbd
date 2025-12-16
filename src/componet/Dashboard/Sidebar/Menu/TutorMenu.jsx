import React from 'react'
import { Link, NavLink } from 'react-router'
const TutorMenu = () => {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <div className='p-6 text-2xl font-bold text-indigo-600'>
                        <Link to='/'>Tutor Dashboard</Link></div>
                    <nav className='mt-6'>
                        <ul>
                            <li  className='block px-6 py-3 hover:bg-indigo-100 rounded'>
                                <NavLink  className={({ isActive }) => isActive ? "bg-green-700 py-3 px-13 rounded-lg" : "hover:text-emerald-700"}to='myapplications'>My Applications</NavLink>
                            </li>

                            <li  className='block px-6 py-3 hover:bg-indigo-100 rounded'>
                                <NavLink className={({ isActive }) => isActive ? "bg-green-700 py-3 px-13 rounded-lg" : "hover:text-emerald-700"} to='ongoingtuition'>Tutor Ongoing</NavLink>
                            </li>

                            <li  className='block px-6 py-3 hover:bg-indigo-100 rounded'>
                                <NavLink className={({ isActive }) => isActive ? "bg-green-700 py-3 px-13 rounded-lg" : "hover:text-emerald-700"} to='revenuehistory' >Revenue History</NavLink>
                            </li>

                         
                        </ul>
                    </nav>
                </div>

                
            </aside>
        </div>
    )
}
export default TutorMenu