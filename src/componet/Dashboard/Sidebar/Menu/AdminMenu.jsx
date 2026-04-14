import React from 'react';
import { NavLink } from 'react-router';
import { Users, BookOpen, BarChart3, LayoutDashboard, ChevronRight, PenTool } from 'lucide-react';

const AdminMenu = () => {
  // গ্রিন থিম এবং একদম হালকা হোভার ইফেক্ট
  const navLinkStyle = ({ isActive }) =>
    `group flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
      isActive
        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm shadow-emerald-100/50"
        : "text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-500 dark:hover:bg-emerald-500/5"
    }`;

  return (
    <div className='px-4'>
      <div className='space-y-8'>
        <div>
          <h2 className='px-4 text-[10px] font-black text-emerald-600/40 uppercase tracking-[0.25em] mb-5'>
            Main Dashboard
          </h2>
          
          <nav className='flex flex-col gap-1.5'>
            <NavLink to="overview" className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <LayoutDashboard size={18} strokeWidth={2.5} />
                <span>Overview</span>
              </div>
              <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </NavLink>

            <NavLink to='usermangement' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <Users size={18} strokeWidth={2.5} />
                <span>User Management</span>
              </div>
              <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </NavLink>

            <NavLink to='tuitionmanagement' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <BookOpen size={18} strokeWidth={2.5} />
                <span>Tuition Management</span>
              </div>
              <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </NavLink>

            <NavLink to='reportsanalytics' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <BarChart3 size={18} strokeWidth={2.5} />
                <span>Analytics & Reports</span>
              </div>
              <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </NavLink>

            <NavLink to='Blogpost' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <PenTool size={18} strokeWidth={2.5} />
                <span>Blog Post</span>
              </div>
              <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;