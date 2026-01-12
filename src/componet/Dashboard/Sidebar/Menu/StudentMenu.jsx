import React from 'react';
import { Link, NavLink } from 'react-router';
import {
  BookOpen,
  PlusCircle,
  Users,
  CreditCard,
  LayoutDashboard,
  LogOut,
  BookMarked
} from 'lucide-react';

const StudentMenu = () => {
  const navLinkStyle = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${isActive
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
      : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
    }`;

  return (
    <div className='flex flex-col h-screen w-72 border-r border-slate-100 p-6 overflow-hidden'>
      <div className='flex items-center gap-3 px-2 mb-12'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-100'>
          <BookMarked className='text-white' size={22} />
        </div>
        <div>
          <h1 className='text-lg font-black text-slate-900 leading-none'>Studentbd</h1>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1'>Learning Dashboard</p>
        </div>
      </div>
      <div className='flex-1 flex flex-col gap-8 overflow-y-auto no-scrollbar'>

        <div>
          <NavLink to="overview" className={navLinkStyle}>
            <li>Overview</li>
          </NavLink>
          <h2 className='px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4'>Study Center</h2>
          <nav className='flex flex-col gap-1.5'>
            <NavLink to='mytuitions' className={navLinkStyle}>
              <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
              <span>My Tuitions</span>
            </NavLink>

            <NavLink to='posttuition' className={navLinkStyle}>
              <PlusCircle size={18} className="group-hover:scale-110 transition-transform" />
              <span>Post New Tuition</span>
            </NavLink>

            <NavLink to='applietutors' className={navLinkStyle}>
              <Users size={18} className="group-hover:scale-110 transition-transform" />
              <span>Applied Tutors</span>
            </NavLink>
          </nav>
        </div>

      
        <div>
          <h2 className='px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4'>Billing</h2>
          <nav className='flex flex-col gap-1.5'>
            <NavLink to='payment' className={navLinkStyle}>
              <CreditCard size={18} />
              <span>Payment History</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default StudentMenu;