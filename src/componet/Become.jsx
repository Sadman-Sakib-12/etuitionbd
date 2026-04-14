import React from 'react';
import { motion } from 'framer-motion';

const BecomeTeacher = () => {
  return (
    <section className="py-12  transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex-1 space-y-7 text-center lg:text-left"
          >
            <div className="space-y-3">
              <span className="text-green-600 font-bold tracking-[0.2em] uppercase text-xs">
                Get Started
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-base-content leading-[1.1]">
                Become a <span className="text-green-600">Teacher</span>
              </h2>
            </div>
            
            <p className="text-lg opacity-70 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join our community of expert educators and share your knowledge with students worldwide. 
              We provide the platform and tools you need to inspire the next generation while 
              growing your professional teaching career.
            </p>

            <div className="pt-6">
              <button className="btn bg-green-600 hover:bg-green-700 border-none btn-lg rounded-xl px-12 shadow-xl shadow-green-200 dark:shadow-none hover:scale-105 transition-all normal-case text-white font-bold">
                Apply Now
              </button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 relative flex items-center justify-center"
          >
            <div className="flex items-end gap-5 md:gap-8 relative z-10">
              
              {/* Smaller Oval Image */}
              <div className="w-36 h-56 md:w-52 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-base-300 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1683121152928-787ececd7359?q=80&w=875&auto=format&fit=crop" 
                  alt="Online Educator" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Larger Oval Image */}
              <div className="w-48 h-72 md:w-72 md:h-[450px] rounded-full overflow-hidden border-4 border-white dark:border-base-300 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500 delay-75">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                  alt="Professional Teacher" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Background Decoration (Green Blur) */}
            <div className="absolute -z-0 w-72 h-72 bg-green-500/10 blur-[100px] rounded-full"></div>
            
            {/* Subtle floating element */}
            <div className="absolute top-10 right-10 w-12 h-12 bg-green-100 rounded-full dark:bg-green-900/20 animate-bounce"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BecomeTeacher;