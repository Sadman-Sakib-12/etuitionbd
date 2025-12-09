import React from 'react'
import { Link } from 'react-router'
import useAuth from '../../../../hooks/useAuth'

const Sidebar = () => {
    const { logout } = useAuth()
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <div className='p-6 text-2xl font-bold text-indigo-600'>
                        <Link to='/'>Dashboard</Link></div>
                    <nav className='mt-6'>
                        <ul>
                            <li>
                                <Link to='mytuitions' className='block px-6 py-3 hover:bg-indigo-100 rounded'>My Tuitions</Link>
                            </li>

                            <li>
                                <Link to='posttuition' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Post New Tuition</Link>
                            </li>

                            <li>
                                <Link to='applietutors' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Applied Tutors</Link>
                            </li>
                            
                            <li>
                                <Link to='' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Payments</Link>
                            </li>
                            <h1>Tutor</h1>
                            <li>
                                <Link to='myapplications' className='block px-6 py-3 hover:bg-indigo-100 rounded'>My Applications</Link>
                            </li>

                            <li>
                                <Link to='ongoingtuition' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Tutor Ongoing</Link>
                            </li>

                            <li>
                                <Link to='revenuehistory' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Revenue History</Link>
                            </li>

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

                <div className='mb-6'>
                    <ul>
                        <li>
                            <Link to='setting' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Profile Settings</Link>
                        </li>
                        <li><button onClick={logout} className='w-full text-left px-6 py-3 hover:bg-red-100 rounded text-red-600 '>Logout</button></li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar