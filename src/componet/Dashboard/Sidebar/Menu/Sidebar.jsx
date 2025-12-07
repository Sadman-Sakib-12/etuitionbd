import React from 'react'
import { Link } from 'react-router'

const Sidebar = () => {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <div  className='p-6 text-2xl font-bold text-indigo-600'>
                        <Link to='/'>Dashboard</Link></div>
                    <nav className='mt-6'>
                        <ul>
                            <li>
                                <Link to='/' className='block px-6 py-3 hover:bg-indigo-100 rounded'>My Tuitions</Link>
                            </li>

                            <li>
                                <Link to='/' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Post New Tuition</Link>
                            </li>

                            <li>
                                <Link to='/' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Applied Tutors</Link>
                            </li>

                            <li>
                                <Link  to='/'className='block px-6 py-3 hover:bg-indigo-100 rounded'>Payments</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='mb-6'>
                    <ul>
                        <li>
                            <Link to='/' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Profile Settings</Link>
                        </li>
                        <li><button className='w-full text-left px-6 py-3 hover:bg-red-100 rounded text-red-600 '>Logout</button></li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar