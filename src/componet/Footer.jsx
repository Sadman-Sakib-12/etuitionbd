import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';
import logo from "../assets/tuiton.jpg";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 mt-10 border-t border-slate-800 transition-colors duration-500">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Section */}
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <img src={logo} className="w-10 h-10 rounded-xl shadow-lg object-cover border border-slate-700" alt="Logo" />
                        <span className="font-black text-2xl tracking-tighter text-white">
                            Tuition<span className="text-orange-500">bd</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed opacity-80">
                        We help students find skilled and verified tutors. We are always by your side to improve the quality of education and provide the right guidance.
                    </p>
                    <div className="flex gap-4 text-lg">
                        {[
                            { icon: <FaFacebookF />, link: "https://facebook.com" },
                            { icon: <FaXTwitter />, link: "https://x.com" },
                            { icon: <FaInstagram />, link: "https://instagram.com" },
                            { icon: <FaLinkedinIn />, link: "https://linkedin.com" }
                        ].map((social, idx) => (
                            <a 
                                key={idx}
                                href={social.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-slate-700/50"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-black text-white uppercase tracking-widest text-sm mb-6 border-l-4 border-orange-500 pl-3">
                        Quick Links
                    </h2>
                    <ul className="space-y-4 font-bold text-sm">
                        <li><Link className="hover:text-orange-500 transition-colors flex items-center gap-2" to="/">Home</Link></li>
                        <li><Link className="hover:text-orange-500 transition-colors flex items-center gap-2" to="/tuitions">Tuitions</Link></li>
                        <li><Link className="hover:text-orange-500 transition-colors flex items-center gap-2" to="/tutors">Tutors</Link></li>
                        <li><Link className="hover:text-orange-500 transition-colors flex items-center gap-2" to="/blog">Blog</Link></li>
                        <li><Link className="hover:text-orange-500 transition-colors flex items-center gap-2" to="/about">About Us</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="font-black text-white uppercase tracking-widest text-sm mb-6 border-l-4 border-orange-500 pl-3">
                        Contact Info
                    </h2>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
                            <span>123 Tuition Street, Kishoreganj, Dhaka, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-orange-500 flex-shrink-0" />
                            <span className="hover:text-orange-400 cursor-pointer transition-colors">info@tuitionbd.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-orange-500 flex-shrink-0" />
                            <span className="hover:text-orange-400 cursor-pointer transition-colors">+880 1234-567890</span>
                        </li>
                    </ul>
                </div>

                {/* Newsletter/Action */}
                <div className="space-y-6">
                    <h2 className="font-black text-white uppercase tracking-widest text-sm mb-6 border-l-4 border-orange-500 pl-3">
                        Join Our Community
                    </h2>
                    <p className="text-xs opacity-70 italic">
                       Stay tuned for new tutorials and updates।
                    </p>
                    <div className="join w-full">
                        <input className="input input-bordered join-item w-full bg-slate-800 border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500" placeholder="Email Address" />
                        <button className="btn btn-primary join-item rounded-r-xl border-none bg-orange-600 hover:bg-orange-500 text-white font-black text-xs">
                            JOIN
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-slate-950/80 border-t border-slate-800/50 py-6 text-center px-5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wider">
                    <p className="opacity-60">
                        &copy; {new Date().getFullYear()} <span className="text-orange-500">Tuitionbd</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6 opacity-60">
                        <Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
                        <Link to="/help" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;