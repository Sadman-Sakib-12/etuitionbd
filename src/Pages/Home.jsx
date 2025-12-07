import React from 'react'
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div>
      <section className=''
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1470&q=80%27)`,
          backgroundSize: 'center',
          height: 400,
          backgroundPosition: 'center'
        }}>
        {/* <div className="absolute inset-0 "></div> */}
        <motion.div
          className='relative z-10 pt-30  text-white font-bold  text-2xl text-center px-10'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          Find the Best Tutors for Your Needs


          <motion.p className="text-2xl text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}>
            Connect with verified tutors and manage your tuitions easily.
          </motion.p>
          <motion.button
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded'
            whileHover={{ scale: 1.1 }}>
            Get Started
          </motion.button>
        </motion.div>
      </section>

      <section className='p-10'>
        <h2 className='text-3xl font-bold mb-6 text-center'>How the Platform Works</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>

          <div className=' p-6 border rounded shadow'>
            <h3 className='text-xl font-bold mb-2'>1.Post a Tuition</h3>
            <p>Create a tuition post with your requirements and publish it to find tutors </p>
          </div>

          <div className=' p-6 border rounded shadow'>
            <h3 className='text-xl font-bold mb-2'>Apply or Hire Tutors</h3>
            <p>Students get applications from tutors, and tutors find suitable tuitions.</p>
          </div>

          <div className=' p-6 border rounded shadow'>
            <h3 className='text-xl font-bold mb-2'>Manage & Pay</h3>
            <p> Track your tuition progress and handle payments securely through the platform.</p>
          </div>
        </div>
      </section>

      <section className='p-6 bg-blue-50'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Why Choose Us</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
          <div className=' p-6 border rounded shadow'>
            <h3 className=' font-bold mb-2'>Verified Tutors </h3>
            <p>All tutors are verified for quality and reliability</p>
          </div>

          <div className=' p-6 border rounded shadow'>
            <h3 className=' font-bold mb-2'>Easy Communication</h3>
            <p> Directly communicate with tutors or students through the platform</p>
          </div>

          <div className=' p-6 border rounded shadow'>
            <h3 className='font-bold mb-2'>Secure Payments</h3>
            <p>Manage payments safely with our built-in payment system</p>
          </div>
        </div>
      </section>
    </div >
  )
}

export default Home