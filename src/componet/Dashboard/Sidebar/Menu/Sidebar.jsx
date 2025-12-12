
import { Link } from 'react-router'
import TutorMenu from './TutorMenu'
import AdminMenu from './AdminMenu'
import useAuth from '../../../../hooks/useAuth'
import useRole from '../../../../hooks/useRole'
import StudentMenu from './StudentMenu'

const Sidebar = () => {
    const { user, logout } = useAuth()
    const [role, isRoleLoading] = useRole()

    if (!user || isRoleLoading) return <div>Loading...</div>

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md flex flex-col justify-between'>
                <div>
                    <nav className='mt-6'>
                        <ul>
                            {role === "student" && <StudentMenu />}
                            {role === "tutor" && <TutorMenu />}
                            {role === "admin" && <AdminMenu />}
                        </ul>
                    </nav>
                </div>

                <div className='mb-6'>
                    <ul>
                        <li>
                            <Link to='/dashboard/setting' className='block px-6 py-3 hover:bg-indigo-100 rounded'>Profile </Link>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className='w-full text-left px-6 py-3 hover:bg-red-100 rounded text-red-600'
                            >
                               LogOut
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar
