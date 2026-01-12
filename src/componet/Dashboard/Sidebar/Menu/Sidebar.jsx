
import { Link } from 'react-router'
import TutorMenu from './TutorMenu'
import AdminMenu from './AdminMenu'
import useAuth from '../../../../hooks/useAuth'
import useRole from '../../../../hooks/useRole'
import StudentMenu from './StudentMenu'
import LoadingSpin from '../../../LoadingSpin'

const Sidebar = () => {
    const { user, logout } = useAuth()
    const [role, isRoleLoading] = useRole()

    if (!user || isRoleLoading) return <div><LoadingSpin /></div>

    return (
        <div className='flex min-h-screen '>
            <aside className='w-64  shadow-md flex flex-col justify-between'>
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
                            <Link to='/dashboard/setting' className='block px-6 py-3 ounded'>Profile </Link>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className='w-full text-left px-6 py-3 rounded text-red-600'
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
