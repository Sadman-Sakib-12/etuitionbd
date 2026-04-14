import React from 'react';
import { NavLink } from 'react-router';
import {
  BookOpen,
  PlusCircle,
  Users,
  CreditCard,
  LayoutDashboard,
  ChevronRight
} from 'lucide-react';

const StudentMenu = () => {
  // প্রফেশনাল এবং প্রিমিয়াম স্টাইল
  const navLinkStyle = ({ isActive }) =>
    `group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-emerald-50 text-emerald-700 shadow-sm" // হালকা ব্যাকগ্রাউন্ডে গাঢ় টেক্সট (Modern Approach)
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const iconStyle = "w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110";

  return (
    <div className='px-4'>
      <div className='space-y-6'>
        
        {/* Dashboard Section */}
        <div>
          <h2 className='px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-80'>
            Dashboard
          </h2>
          <nav className='flex flex-col gap-1'>
            <NavLink to="overview" className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <LayoutDashboard className={iconStyle} />
                <span>Overview</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>
          </nav>
        </div>

        {/* Study Center Section */}
        <div>
          <h2 className='px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-80'>
            Academic
          </h2>
          <nav className='flex flex-col gap-1'>
            <NavLink to='mytuitions' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <BookOpen className={iconStyle} />
                <span>My Tuitions</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>

            <NavLink to='posttuition' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <PlusCircle className={iconStyle} />
                <span>Post New Tuition</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>

            <NavLink to='applietutors' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <Users className={iconStyle} />
                <span>Applied Tutors</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>
          </nav>
        </div>

        {/* Finance Section */}
        <div>
          <h2 className='px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-80'>
            Finance
          </h2>
          <nav className='flex flex-col gap-1'>
            <NavLink to='payment' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <CreditCard className={iconStyle} />
                <span>Payment History</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default StudentMenu;