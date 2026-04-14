import { Link } from 'react-router'; 
import TutorMenu from './TutorMenu';
import AdminMenu from './AdminMenu';
import StudentMenu from './StudentMenu';
import useAuth from '../../../../hooks/useAuth';
import useRole from '../../../../hooks/useRole';
import LoadingSpin from '../../../LoadingSpin';
import { UserCircle, LogOut, ShieldCheck, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { user, logout } = useAuth();
    const [role, isRoleLoading] = useRole();

    if (!user || isRoleLoading) return null; // Let the main layout handle loading

    return (
        <>
            {/* --- Mobile Overlay --- */}
            <div 
                className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* --- Sidebar Content --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 shadow-xl transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:shadow-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className='flex flex-col h-full'>
                    
                    {/* Brand Header (Desktop) */}
                    <div className='p-6 border-b border-slate-50'>
                        <div className='flex items-center justify-between'>
                            <Link to="/" className='flex items-center gap-3'>
                                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-100 shrink-0'>
                                    <ShieldCheck className='text-white' size={22} />
                                </div>
                                <div>
                                    <h1 className='text-md font-black text-slate-900 leading-none'>Tuitions<span className='text-emerald-600'>BD</span></h1>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1'>Dashboard</p>
                                </div>
                            </Link>
                            {/* Close button for mobile */}
                            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className='flex-1 overflow-y-auto py-4 px-4 space-y-1 custom-scrollbar'>
                        <div onClick={() => setIsOpen(false)}>
                            {role === "student" && <StudentMenu />}
                            {role === "tutor" && <TutorMenu />}
                            {role === "admin" && <AdminMenu />}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className='p-4 bg-slate-50/50 border-t border-slate-100'>
                        <Link 
                            to='/dashboard/setting' 
                            onClick={() => setIsOpen(false)}
                            className='flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-semibold text-sm hover:bg-white hover:text-emerald-600 transition-all duration-200'
                        >
                            <UserCircle size={20} />
                            <span>My Profile</span>
                        </Link>
                        <button
                            onClick={() => { logout(); setIsOpen(false); }}
                            className='flex items-center gap-3 w-full mt-1 px-4 py-3 rounded-xl text-rose-500 font-semibold text-sm hover:bg-rose-50 transition-all duration-200'
                        >
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;