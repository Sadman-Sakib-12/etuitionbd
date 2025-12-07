import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <footer className='bg-gray-200 text-base-content mt-10'>
            <div className='max-w-7xl mx-auto py-10 px-5 grid md:grid-cols-4 gap-8'>
                <div>
                    <h2 className='font-bold text-lg mb-3'>About Tuition Platfrom</h2>
                    <p className='text-sm'> We connect students with verifide tutors for a</p>
                </div>

                <div>
                    <h1>Quick Links</h1>
                    <ul className='space-y-2'>
                        <li><Link>Home</Link></li>
                        <li><Link>Tuitions</Link></li>
                        <li><Link>Tutors</Link></li>
                        <li><Link>About </Link></li>
                        <li><Link>Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h2>Contact Us</h2>
                    <p>123 Tuitioon Street,Kishoreganj,Bangladesh</p>
                    <p>Email:</p>
                    <p>phone</p>
                </div>

                <div>
                    <h1>Follow Us</h1>
                    <div className='flex gap-4 text-xl'>
                        <a href="http://x.com" target="_blank" rel="noreferrer" className='hover:text-primary'><FaXTwitter /></a>
                        <a href="http://facebook" target="_blank" rel=" noreferrer"  className='hover:text-primary'><FaFacebookF/></a>
                        <a href="http://instagram.com" target="_blank" rel=" noreferrer"  className='hover:text-primary'><FaInstagram/></a>
                        <a href="http://linkedin.com" target="_blank" rel=" noreferrer"  className='hover:text-primary'><FaLinkedinIn/></a>
                    </div>
                </div>
            </div>
            <div className='bg-base-300 text-center py-4 text-sm'>
                &copy;{new Date().getFullYear()} Tuition Platform. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer