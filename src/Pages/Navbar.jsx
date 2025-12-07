import React, { use, useState } from 'react'
import { useContext } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router'
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
    const { user, logout } = use(AuthContext)
    const [isOpen, setIsOpen] = useState(true)
    const navLinks = (
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/tuitions'>Tuitions</Link></li>
            <li><Link to='/tutors'>Tutors</Link></li>
            <li><Link to='/About'>About</Link></li>
            <li><Link to='/Contact'>Contact</Link></li>
        </>
    )
    return (
        <div className='sticky top-0 z-50 bg-green-400 shadow '>
            <div className='navbar max-w-7xl mx-auto flex items-center justify-between'>
                {/* Left section */}
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <button tabIndex={0} onClick={() => setIsOpen(!isOpen)} className='btn btn-ghost lg:hidden'>
                            <svg xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 '
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                        </button>
                        {isOpen && (
                            <ul tabIndex={0}
                                className='menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52'>
                                {navLinks}
                            </ul>
                        )}
                    </div>

                    {/* Logo name */}
                    <Link to='/' className='font-bold text-2xl'>
                        <span className='text-primary '>Tuition</span>
                    </Link>
                </div>
                <div className='navbar-center hidden lg:flex'>
                    <ul className='menu menu-horizontal px-1 flex items-center '>{navLinks}</ul>
                </div>
                {/* Right */}
                <div className='navbar-end flex items-center gap-2'>
                    {
                        !user && (
                            <>
                                <Link to='/login' className='btn btn-outline btn-sm'>Login</Link>
                                <Link to='/regiter' className='btn btn-outline btn-sm'>Register</Link>
                            </>
                        )}

                    {user && (
                        <div className='dropdown dropdown-end'>
                            <label tabIndex={0} className='btn btn-ghost m-1 flex items-center gap-2'>
                                <div>
                                    {
                                        user.photoURL ? (<img className='rounded-full h-15 w-15' src={user.photoURL} alt="profile" />) : (< FaUserCircle size={30} />)
                                    }
                                </div>
                            </label>
                            <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48'>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
