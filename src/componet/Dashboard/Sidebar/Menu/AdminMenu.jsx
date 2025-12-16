import React from 'react'
import { Link, NavLink } from 'react-router'
const AdminMenu = () => {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <div className='p-6 text-2xl font-bold text-indigo-600'>
                        <Link to='/'>Admin Dashboard</Link></div>
                    <nav className='mt-6'>
                        <ul>
                            <li className='block px-6 py-3 hover:bg-indigo-100 rounded'>
                                <NavLink className={({ isActive }) => isActive ? "bg-green-700 py-3 px-8 rounded-lg" : "hover:text-emerald-700"} to='usermangement' >User Management</NavLink>
                            </li >
                            <li className='block px-6 py-3 hover:bg-indigo-100 rounded'>
                                <NavLink className={({ isActive }) => isActive ? "bg-green-700 py-3 px-5 rounded-lg" : "hover:text-emerald-700"} to='tuitionmanagement' >Tuition Management</NavLink>
                            </li >
                            <li className='block px-6 py-3 hover:bg-indigo-100 rounded'>
                                <NavLink className={({ isActive }) => isActive ? "bg-green-700 py-3 px-8 rounded-lg" : "hover:text-emerald-700"} to='reportsanalytics' > Reports & Analytics</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                
            </aside>
        </div>
    )
}
export default AdminMenu