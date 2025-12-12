import React from 'react'
import { Link } from 'react-router'
const TutorMenu = () => {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <div className='p-6 text-2xl font-bold text-indigo-600'>
                        <Link to='/'>Tutor Dashboard</Link></div>
                    <nav className='mt-6'>
                        <ul>
                            <li>
                                <Link to='myapplications' className='block px-6 py-3 hover:bg-indigo-100 rounded'>My Applications</Link>
                            </li>

                            <li>
                                <Link to='ongoingtuition' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Tutor Ongoing</Link>
                            </li>

                            <li>
                                <Link to='revenuehistory' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Revenue History</Link>
                            </li>

                         
                        </ul>
                    </nav>
                </div>

                
            </aside>
        </div>
    )
}
export default TutorMenu