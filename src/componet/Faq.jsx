import React from 'react';
import { motion } from 'framer-motion';

const Faq = () => {
  const faqData = [
    {
      id: 1,
      question: "High-Quality Video Lessons?",
      answer: "We provide high-definition video lessons recorded by industry experts to ensure the best learning experience for our students."
    },
    {
      id: 2,
      question: "Personalized Feedback and Support?",
      answer: "Our mentors provide one-on-one feedback and 24/7 support to help you overcome any challenges during your learning journey."
    },
    {
      id: 3,
      question: "Access to Course Materials and Resources?",
      answer: "Once enrolled, you get lifetime access to all course materials, including lecture notes, assignments, and exclusive resources."
    },
    {
      id: 4,
      question: "What courses do you offer?",
      answer: "We offer a wide range of courses including Web Development, Graphic Design, Digital Marketing, and Admission Preparation."
    }
  ];

  return (
    <section className="py-4  transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Accordion Content (ইমেজ অনুযায়ী ডিজাইন) */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="mb-12 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-10 bg-primary/40 rounded-full"></div>
                <span className="text-primary font-extrabold uppercase tracking-[0.2em] text-xs">
                  Our FAQ
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold  leading-[1.15]">
                Transform Your Education With <br />
                Our Accessible Online Courses
              </h2>
            </div>

            <div className="divide-y divide-base-200 dark:divide-neutral/30">
              {faqData.map((item) => (
                <div 
                  key={item.id} 
                  className="collapse collapse-arrow bg-transparent rounded-none group"
                >
                  <input type="radio" name="faq-accordion" defaultChecked={item.id === 1} /> 
                  <div className="collapse-title text-xl font-bold px-0 py-7 group-hover:text-primary transition-colors flex items-center gap-2">
                    <span className="opacity-40 text-sm font-normal">{item.id}.</span> {item.question}
                  </div>
                  <div className="collapse-content px-0 opacity-70 leading-relaxed text-[16px]"> 
                    <p className="pb-6 max-w-2xl">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Valid Illustration Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center order-1 lg:order-2 relative"
          >
            <div className="relative z-10 w-full max-w-[550px]">
              {/* ভ্যালিড ইলস্ট্রেশন ইমেজ (Unsplash থেকে সরাসরি লিঙ্ক) */}
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop" 
                alt="Student studying illustration" 
                className="w-full h-auto drop-shadow-2xl rounded-3xl"
              />
              
              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 w-24 h-24 bg-primary/5 rounded-full blur-2xl"
              ></motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Faq;