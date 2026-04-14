import React from 'react';
import { NavLink } from 'react-router';
import {
  Briefcase,
  Clock,
  Wallet,
  LayoutDashboard,
  ChevronRight
} from 'lucide-react';

const TutorMenu = () => {
  // প্রফেশনাল এবং প্রিমিয়াম স্টাইল (SaaS Standard)
  const navLinkStyle = ({ isActive }) =>
    `group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-emerald-50 text-emerald-700 shadow-sm"
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

        {/* Teaching Space Section */}
        <div>
          <h2 className='px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-80'>
            Teaching Space
          </h2>
          <nav className='flex flex-col gap-1'>
            <NavLink to='myapplications' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <Briefcase className={iconStyle} />
                <span>My Applications</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>

            <NavLink to='ongoingtuition' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <Clock className={iconStyle} />
                <span>Ongoing Tuitions</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>
          </nav>
        </div>

        {/* Finance Section */}
        <div>
          <h2 className='px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-80'>
            Earnings
          </h2>
          <nav className='flex flex-col gap-1'>
            <NavLink to='revenuehistory' className={navLinkStyle}>
              <div className='flex items-center gap-3'>
                <Wallet className={iconStyle} />
                <span>Revenue History</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-all" />
            </NavLink>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default TutorMenu;