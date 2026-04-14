import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import LatestTutionPost from '../componet/LatestTutionPost';
import LatestTutors from '../componet/LatestTutors';
import LoadingSpin from '../componet/LoadingSpin';
import {
  FaGraduationCap,
  FaSearchLocation,
  FaCheckCircle,
  FaUserGraduate,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaBookOpen,
  FaStar
} from 'react-icons/fa';
import Testimonials from '../componet/Testimonials';
import BlogPreview from '../componet/BlogPreview';
import Study from '../componet/Study';
import BecomeTeacher from '../componet/Become';
import Faq from '../componet/Faq';
import WhyTuitions from '../componet/WhyTuitions';
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const StepCard = ({ num, title, desc, icon, delay }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    transition={{ delay }}
    className="relative  rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
  >
    <div className="absolute -top-5 right-6 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
      {num}
    </div>
    <div className="text-emerald-600 text-5xl mb-6 mt-2 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="">{desc}</p>
  </motion.div>
);




const SectionTitle = ({ title, subtitle, centered = false, gradient = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${gradient
        ? 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600'
        : ''
      }`}>
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

const Home = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <LoadingSpin size="large" />
      </div>
    );
  }

  return (
    <div className="  min-h-screen">

      <Hero />

      <section className="py-16 md:py-2 bg-gradient-to-b ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle title="Latest Tuition Needs" subtitle="Current requirements from parents & students" />
          <LatestTutionPost limit={8} showMoreLink />
        </div>
      </section>



      <section className="py-1 md:py-20 ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Study/>
        </div>
      </section>

      <section className="py-1 md:py-20 ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <LatestTutors featured limit={8} />
        </div>
      </section>
      
      <section className="py-1 md:py-16   border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { value: "6,200+", label: "Verified Tutors" },
            { value: "18,500+", label: "Happy Students" },
            { value: "42,000+", label: "Tuition Matches" },
            { value: "98.4%", label: "Success Rate" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-emerald-600">{stat.value}</div>
              <div className="mt-2 text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="py-2 md:py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Testimonials/>
        </div>
      </section>


<WhyTuitions/>


      <section className="py-5 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
         <BecomeTeacher/>
        </div>
      </section>

      <section className="py-5 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
       <Faq/>
        </div>
      </section>

      <section className="py-5 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          < BlogPreview  /> 
        </div>
      </section>
       
    </div>
  );
};





export default Home;