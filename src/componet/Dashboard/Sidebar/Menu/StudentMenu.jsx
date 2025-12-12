import React from 'react'
import { Link } from 'react-router'
const StudentMenu = () => {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <div className='p-6 text-2xl font-bold text-indigo-600'>
                        <Link to='/'>Studen</Link></div>
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
                                <Link to='payment' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Payments</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )

}

export default StudentMenu