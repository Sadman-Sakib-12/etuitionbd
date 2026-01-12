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

const CategoryPill = ({ title }) => (
  <div className="rounded-xl px-6 py-8 text-center shadow-sm hover:shadow-md hover:border-emerald-500 border border-gray-200 dark:border-gray-700 transition-all cursor-pointer">
    <div className="text-4xl mb-3">📚</div>
    <span className="font-medium">{title}</span>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className=" backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
  >
    <div className="text-emerald-600 dark:text-emerald-500 text-6xl mb-6">
      {React.cloneElement(icon, { className: "w-12 h-12 mx-auto" })}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className=" leading-relaxed">{desc}</p>
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


      <section className="py-1 md:py-16  border-b border-gray-200 dark:border-gray-800">
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


      <section className="py-16 md:py-2 bg-gradient-to-b ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle title="Latest Tuition Needs" subtitle="Current requirements from parents & students" />
          <LatestTutionPost limit={8} showMoreLink />
        </div>
      </section>


      <section className="py-2 md:py-24 ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle
            title="How TuitionHub Works"
            subtitle="Simple 3-step process"
            centered
            gradient
          />
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-12">
            {[
              { num: "01", title: "Post Requirement", desc: "Create tuition post in under 2 minutes", icon: <FaGraduationCap /> },
              { num: "02", title: "Get Matched", desc: "Receive applications from nearby qualified tutors", icon: <FaSearchLocation /> },
              { num: "03", title: "Start Learning", desc: "Choose best tutor & begin classes", icon: <FaCheckCircle /> }
            ].map((step, i) => (
              <StepCard key={i} {...step} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>


      <section className="py-1 md:py-20 ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle title="Popular Subjects" subtitle="Most in-demand categories right now" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-10">
            {["Math", "English", "Physics", "Chemistry", "Biology", "ICT", "Bangla", "Admission", "University", "Class 9-10", "HSC"].map(item => (
              <CategoryPill key={item} title={item} />
            ))}
          </div>
        </div>
      </section>


      <section className="py-1 md:py-20 ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <LatestTutors featured limit={8} />
        </div>
      </section>


      <section className="py-2 md:py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle title="What Our Users Say" subtitle="Real experiences from students & parents" centered />
          <Testimonials/>
        </div>
      </section>


      <section className="py-2 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle title="Why Choose TuitionHub?" centered />
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-12">
            <FeatureCard
              icon={<FaUserGraduate />}
              title="100% Verified Tutors"
              desc="Strict verification including NID & academic certificates"
            />
            <FeatureCard
              icon={<FaShieldAlt />}
              title="Safe & Secure"
              desc="End-to-end encryption • Secure payments • Privacy focused"
            />
            <FeatureCard
              icon={<FaChalkboardTeacher />}
              title="Smart Matching"
              desc="Location-based, budget & subject smart recommendations"
            />
          </div>
        </div>
      </section>


      <section className="py-16 md:py-20 ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle title="Learning Tips & Guides" subtitle="Helpful articles from expert tutors" />
          < BlogPreview  /> 
        </div>
      </section> 
    </div>
  );
};





export default Home;