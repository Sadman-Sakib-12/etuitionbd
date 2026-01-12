import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";

import useAuth from "../hooks/useAuth";
import logo from "../assets/tuiton.jpg";
import { FaBars, FaLayerGroup, FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  // থিম কন্ট্রোল
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // একটি কমন ক্লাস যা একটিভ থাকলে অরেঞ্জ হবে
  const navLinkClass = ({ isActive }) =>
    `relative font-bold transition-all duration-300 ${
      isActive
        ? "text-orange-500 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-orange-500"
        : "text-slate-200 hover:text-orange-400"
    }`;

  // লগআউট থাকা অবস্থায় রুট (৩টি শর্ত)
  const publicLinks = (
    <>
      <li><NavLink className={navLinkClass} to="/">Home</NavLink></li>
      <li><NavLink className={navLinkClass} to="/tuitions">Tuitions</NavLink></li>
      <li><NavLink className={navLinkClass} to="/tutors">Tutors</NavLink></li>
      <li><NavLink className={navLinkClass} to="/about">About</NavLink></li>
    </>
  );

  // লগইন থাকা অবস্থায় রুট (৫টি শর্ত পূরণ করতে আরও ২টি ড্যাশবোর্ড রিলেটেড রুট)
  const privateLinks = (
    <>
      {publicLinks}
      <li><NavLink className={navLinkClass} to="/blog">Blog</NavLink></li>
      <li><NavLink className={navLinkClass} to="/privacy">PrivacyTerms</NavLink></li>
      <li><NavLink className={navLinkClass} to="/help">HelpSupport</NavLink></li>
    </>
  );

  return (
    <div className="sticky top-0 z-[100] bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* লোগো এবং মোবাইল মেনু */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white mr-2">
              <FaBars size={20} />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-slate-800 text-white rounded-[2rem] w-64 border border-slate-700 space-y-2">
              {user ? privateLinks : publicLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src={logo} className="w-10 h-10 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300" alt="Logo" />
              <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full -z-10 animate-pulse"></div>
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">
              Tuition<span className="text-orange-500">bd</span>
            </span>
          </Link>
        </div>

        {/* ডেক্সটপ মেনু */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8 px-1">
            {user ? privateLinks : publicLinks}
          </ul>
        </div>

        {/* ডানদিকের বাটন এবং প্রোফাইল */}
        <div className="navbar-end gap-3">
          {/* থিম টগল */}
          <button onClick={handleTheme} className="p-2.5 rounded-xl bg-slate-800 text-orange-400 hover:bg-slate-700 transition-colors shadow-inner">
            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>

          {!user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-5 py-2.5 font-bold text-white hover:text-orange-400 transition-all">
                Login
              </Link>
              <Link to="/regiter" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
                Register
              </Link>
            </div>
          ) : (
            /* অ্যাডভান্স প্রোফাইল মেনু (Dropdown) */
            <div className="dropdown dropdown-end group">
              <label tabIndex={0} className="cursor-pointer">
                <div className="flex items-center gap-2 p-1.5 pr-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all border border-slate-700">
                  {user.photoURL ? (
                    <img src={user.photoURL} className="w-9 h-9 rounded-xl object-cover border-2 border-orange-500" alt="Profile" />
                  ) : (
                    <div className="p-2 bg-slate-700 rounded-xl text-orange-500"><FaUserCircle size={20} /></div>
                  )}
                  <span className="hidden md:block text-xs font-black text-slate-200">Account</span>
                </div>
              </label>

              <ul tabIndex={0} className="dropdown-content mt-4 z-[100] p-3 shadow-2xl bg-slate-800 border border-slate-700 rounded-[1.5rem] w-64 text-slate-200">
                <div className="px-4 py-3 border-b border-slate-700 mb-2">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Signed in as</p>
                  <p className="font-bold truncate text-orange-400">{user.displayName || "User"}</p>
                </div>
                
                <li>
                  <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-xl transition-all font-bold group">
                    <FaLayerGroup className="text-orange-500 group-hover:scale-110 transition-transform" /> Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-red-500/10 text-red-400 rounded-xl transition-all font-bold mt-1 group">
                    <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;