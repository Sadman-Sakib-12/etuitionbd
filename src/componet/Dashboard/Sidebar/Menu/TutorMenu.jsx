import React from 'react';
import { Link, NavLink } from 'react-router';
import {
  Briefcase,
  Clock,
  Wallet,
  LayoutDashboard,
  UserCircle,
  LogOut,
  GraduationCap
} from 'lucide-react';

const TutorMenu = () => {
  
 const navLinkStyle = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${isActive
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
      : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
    }`;

  return (
    <div className='flex flex-col h-screen w-72 bg-white border-r border-slate-100 p-6 overflow-hidden'>

      {/* Brand Header */}
      <NavLink to="overview" className={navLinkStyle}>
        <li>Overview</li>
      </NavLink>
      <div className='flex items-center gap-3 px-2 mb-12'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 shadow-lg shadow-orange-100'>
          <GraduationCap className='text-white' size={24} />
        </div>
        <div>
          <h1 className='text-lg font-black text-slate-900 leading-none'>TutorHub</h1>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1'>Educator Panel</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className='flex-1 flex flex-col gap-8 overflow-y-auto no-scrollbar'>

        {/* Core Teaching Section */}
        <div>
          <h2 className='px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4'>Teaching Space</h2>
          <nav className='flex flex-col gap-1'>
            <NavLink to='myapplications' className={navLinkStyle}>
              <Briefcase size={18} className="group-hover:scale-110 transition-transform" />
              <span>My Applications</span>
            </NavLink>

            <NavLink to='ongoingtuition' className={navLinkStyle}>
              <Clock size={18} className="group-hover:scale-110 transition-transform" />
              <span>Ongoing Tuitions</span>
            </NavLink>

            <NavLink to='revenuehistory' className={navLinkStyle}>
              <Wallet size={18} className="group-hover:scale-110 transition-transform" />
              <span>Revenue History</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TutorMenu;