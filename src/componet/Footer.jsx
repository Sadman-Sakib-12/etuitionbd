import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-gray-300 mt-5">
            <div className="max-w-7xl mx-auto py-10 px-5 grid md:grid-cols-4 gap-8">

                {/* About */}
                <div>
                    <h2 className="font-bold text-lg mb-3 text-white">
                        About Tuition Platform
                    </h2>
                    <p className="text-sm leading-relaxed">
                        We connect students with verified tutors for quality learning
                        and smooth educational support.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-bold text-lg mb-3 text-white">
                        Quick Links
                    </h2>
                    <ul className="space-y-2">
                        <li><Link className="hover:text-orange-400" to="/">Home</Link></li>
                        <li><Link className="hover:text-orange-400" to="/tuitions">Tuitions</Link></li>
                        <li><Link className="hover:text-orange-400" to="/tutors">Tutors</Link></li>
                        <li><Link className="hover:text-orange-400" to="/about">About</Link></li>
                        <li><Link className="hover:text-orange-400" to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="font-bold text-lg mb-3 text-white">
                        Contact Us
                    </h2>
                    <p>123 Tuition Street</p>
                    <p>Kishoreganj, Bangladesh</p>
                    <p>Email: info@tuitionplatform.com</p>
                    <p>Phone: +880 1234-567890</p>
                </div>

                {/* Social */}
                <div>
                    <h2 className="font-bold text-lg mb-3 text-white">
                        Follow Us
                    </h2>
                    <div className="flex gap-4 text-xl">
                        <a href="http://x.com" target="_blank" rel="noreferrer"
                           className="hover:text-orange-400">
                            <FaXTwitter />
                        </a>
                        <a href="http://facebook.com" target="_blank" rel="noreferrer"
                           className="hover:text-orange-400">
                            <FaFacebookF />
                        </a>
                        <a href="http://instagram.com" target="_blank" rel="noreferrer"
                           className="hover:text-orange-400">
                            <FaInstagram />
                        </a>
                        <a href="http://linkedin.com" target="_blank" rel="noreferrer"
                           className="hover:text-orange-400">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-slate-800 text-center py-4 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Tuition Platform. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
