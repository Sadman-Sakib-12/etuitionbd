import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from "../assets/tuiton.jpg";
import { FaBars, FaLayerGroup, FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `relative font-bold transition-all duration-300 text-sm tracking-wide ${
      isActive
        ? "text-orange-500 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-orange-500"
        : "text-slate-200 hover:text-orange-400"
    }`;


  const menuLinks = (
    <>
      <li><NavLink className={navLinkClass} to="/">Home</NavLink></li>
      
 
      {user && (
        <>
          <li><NavLink className={navLinkClass} to="/tuitions">Tuitions</NavLink></li>
          <li><NavLink className={navLinkClass} to="/tutors">Tutors</NavLink></li>
        </>
      )}
      <li><NavLink className={navLinkClass} to="/about">About</NavLink></li>
      <li><NavLink className={navLinkClass} to="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <div className="sticky top-0 z-[100] bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="navbar max-w-7xl mx-auto px-4 py-2">
        
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white mr-2 p-0 min-h-0 h-auto">
              <FaBars size={22} />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-5 shadow-2xl bg-slate-900 text-white rounded-[2rem] w-64 border border-slate-800 space-y-3">
              {menuLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logo} className="w-9 h-9 rounded-lg shadow-lg object-cover" alt="Logo" />
            <span className="font-black text-xl tracking-tighter text-white">
              Tuition<span className="text-orange-500">bd</span>
            </span>
          </Link>
        </div>

      
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-10">
            {menuLinks}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          <button onClick={handleTheme} className="p-2.5 rounded-xl bg-slate-800/50 text-orange-400 hover:bg-slate-800 transition-all border border-slate-700/50">
            {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
          </button>

          {!user ? (
            <Link to="/login" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-xl text-sm font-black shadow-lg shadow-orange-900/10 active:scale-95 transition-all">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer block">
                <div className="flex items-center gap-2 p-1.5 pr-3 bg-slate-800/40 hover:bg-slate-800 rounded-2xl transition-all border border-slate-700/50">
                  {user.photoURL ? (
                    <img src={user.photoURL} className="w-8 h-8 rounded-lg object-cover border border-orange-500/30" alt="Profile" />
                  ) : (
                    <div className="p-2 bg-slate-700 rounded-lg text-orange-500"><FaUserCircle size={18} /></div>
                  )}
                  <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-300">Profile</span>
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content mt-4 z-[100] p-2 shadow-2xl bg-slate-900 border border-slate-800 rounded-2xl w-56 text-slate-200">
                <li><Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl transition-all text-sm font-bold group"><FaLayerGroup className="text-orange-500" /> Dashboard</Link></li>
                <li><button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 text-red-400 rounded-xl transition-all text-sm font-bold mt-1"><FaSignOutAlt /> Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;