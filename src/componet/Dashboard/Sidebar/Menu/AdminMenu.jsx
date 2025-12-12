import React from 'react'
import { Link } from 'react-router'
const AdminMenu = () => {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <div className='p-6 text-2xl font-bold text-indigo-600'>
                        <Link to='/'>Dashboard</Link></div>
                    <nav className='mt-6'>
                        <ul>
                     

                            <h1>Admin</h1>
                            <li>
                                <Link to='usermangement' className='block px-6 py-3 hover:bg-indigo-100 rounded'>User Management</Link>
                            </li>
                            <li>
                                <Link to='tuitionmanagement' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Tuition Management</Link>
                            </li>
                            <li>
                                <Link to='reportsanalytics' className='block px-6 py-3 hover:bg-indigo-100 rounded'> Reports & Analytics</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                
            </aside>
        </div>
    )
}
export default AdminMenu