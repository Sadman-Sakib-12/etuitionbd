import React from 'react';
import { Link, NavLink } from 'react-router';
import {
  Users,
  BookOpen,
  BarChart3,
  LayoutDashboard,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const AdminMenu = () => {
  const navLinkStyle = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${isActive
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
      : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
    }`;

  return (
    <div className='flex flex-col h-screen w-72  border-r border-slate-100 p-6 overflow-hidden'>

      {/* Brand Header */}
      <div className='flex items-center gap-3 px-2 mb-12'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-100'>
          <ShieldCheck className='text-white' size={24} />
        </div>
        <div>
          <h1 className='text-lg font-black text-slate-900 leading-none'>AdminHub</h1>
          <p className='text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-1'>Control Panel</p>
        </div>
      </div>
        <NavLink to="overview" className={navLinkStyle}>
            <li>Overview</li>
          </NavLink>
      {/* Menu Sections */}
      <div className='flex-1 flex flex-col gap-8 overflow-y-auto no-scrollbar'>

        {/* Core Section */}
        <div>
          <h2 className='px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4'>Main Dashboard</h2>
        
          <nav className='flex flex-col gap-1'>
            <NavLink to='usermangement' className={navLinkStyle}>
              <Users size={18} className="group-hover:scale-110 transition-transform" />
              <span>User Management</span>
            </NavLink>

            <NavLink to='tuitionmanagement' className={navLinkStyle}>
              <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
              <span>Tuition Management</span>
            </NavLink>

            <NavLink to='reportsanalytics' className={navLinkStyle}>
              <BarChart3 size={18} className="group-hover:scale-110 transition-transform" />
              <span>Analytics & Reports</span>
            </NavLink>
          </nav>
        </div>

        {/* Support Section */}

      </div>
    </div>
  );
};

export default AdminMenu;