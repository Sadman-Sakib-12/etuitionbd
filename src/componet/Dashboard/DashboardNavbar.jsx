import { useState } from 'react';
import { Link } from 'react-router';
import { ShieldCheck, Bell, Search, Menu, ChevronDown } from 'lucide-react';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';

const PAGE_LABELS = {
  admin: 'User Management',
  tutor: 'My Applications',
  student: 'My Tuitions',
};

const DashboardNavbar = ({ setIsOpen }) => {
  const { user } = useAuth();
  const [role] = useRole();
  const [searchFocused, setSearchFocused] = useState(false);

  const initials = user?.displayName?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center justify-between px-4 md:px-6 shrink-0">
      
      {/* LEFT: Mobile Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-slate-400 capitalize">{role} Panel</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-semibold truncate max-w-[120px]">
            {PAGE_LABELS[role] ?? 'Overview'}
          </span>
        </div>
      </div>

      {/* RIGHT: Search + Avatar */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* Search - Hidden on tiny screens, grows on focus */}
        <div className={`hidden md:flex items-center gap-2 bg-slate-100 border rounded-xl px-3 h-10 transition-all duration-300 ${
          searchFocused ? 'border-emerald-300 ring-2 ring-emerald-50 w-64' : 'border-transparent w-44'
        }`}>
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative h-10 w-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-100 ml-1">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {initials}
          </div>
          <div className="hidden lg:flex flex-col items-start leading-none">
            <span className="text-sm font-bold text-slate-800">{user?.displayName?.split(' ')[0]}</span>
            <span className="text-[11px] text-slate-400 capitalize">{role}</span>
          </div>
          <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;