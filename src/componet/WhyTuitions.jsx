import React from 'react';
import { FaChalkboardTeacher, FaShieldAlt, FaUserGraduate, FaCheckCircle } from "react-icons/fa";

const WhyTuitions = () => {
  const features = [
    {
      icon: <FaUserGraduate />,
      title: "100% Verified Tutors",
      desc: "Strict verification including NID & academic certificates.",
      // Success color logic for green theme
      bgBox: "bg-success/10", 
      iconColor: "text-success" 
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      desc: "End-to-end encryption and secure payments.",
      bgBox: "bg-success/20",
      iconColor: "text-success"
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Smart Matching",
      desc: "AI-based tutor recommendations for your needs.",
      bgBox: "bg-success/10",
      iconColor: "text-success"
    }
  ];

  return (
    /* text-base-content auto mode switch handle korbe */
    <section className="py-20 md:py-32 overflow-hidden text-base-content transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="lg:w-1/2">
            {/* badge-success use kora hoyeche green theme er jonno */}
            <div className="badge badge-success badge-outline py-4 px-6 mb-6 font-bold uppercase text-xs tracking-widest">
              Why TuitionHub?
            </div>

            {/* Heading with Success Green highlight */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 transition-colors">
              Empowering Students with <span className="text-success italic">Right Mentors.</span>
            </h2>

            {/* Paragraph with opacity logic for both modes */}
            <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
              We don't just provide tutors; we ensure a safe, verified, and result-oriented learning environment for every student.
            </p>
            
            {/* Checklist with Success Green icons */}
            <div className="space-y-4">
              {['Trusted by 10k+ Parents', 'Fastest Response Time', 'Expert Career Guidance'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="text-success" />
                  <span className="font-medium text-base-content/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Feature List */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              {/* Greenish Glow effect */}
              <div className="absolute -inset-4 bg-success/5 rounded-3xl blur-3xl" />
              
              <div className="relative space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    /* bg-base-200 DaisyUI theme onujayi light/dark color shift korbe */
                    className="group flex items-start gap-6 p-6 bg-base-200/40 backdrop-blur-sm rounded-2xl border border-base-300 hover:border-success/40 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Icon container - Green theme focus */}
                    <div className={`flex-shrink-0 w-14 h-14 ${feature.bgBox} rounded-xl flex items-center justify-center text-2xl ${feature.iconColor} transition-all duration-500 group-hover:scale-110`}>
                      {feature.icon}
                    </div>

                    <div>
                      {/* Title automatically adjusts color via base-content */}
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      {/* Description with subtle color switch */}
                      <p className="text-base-content/60 leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyTuitions;