import React from 'react';

const Study = () => {
  return (
    <section className="relative w-full min-h-screen bg-base-100 text-base-content overflow-hidden flex items-center py-12 transition-colors duration-500">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
          backgroundSize: '250px'
        }}
      ></div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-8 h-8 border-2 border-green-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 left-1/4 w-6 h-6 border-2 border-green-500/10 rotate-45"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-2 gap-10 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="max-w-xl order-2 md:order-1">
          <h4 className="text-base-content/50 text-2xl md:text-3xl font-light mb-1 italic">
            Welcome To
          </h4>
          <h1 className="text-green-600 text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
            Studypress University
          </h1>
          
          <div className="space-y-5 text-base-content/70 text-[16px] leading-relaxed text-justify">
            <p className="font-medium text-base-content italic border-l-4 border-green-500 pl-4 bg-green-50/50 dark:bg-green-900/10 py-3 rounded-r-lg">
              Empowering students through innovative learning, research excellence, and a commitment to global leadership.
            </p>
            
            <p>
              At Studypress, we believe that education is the cornerstone of a brighter future. Our university offers a vibrant academic community where curiosity meets opportunity. We provide state-of-the-art facilities and mentorship from world-class faculty members.
            </p>

            <p>
              Whether you are pursuing undergraduate studies or advanced research, our diverse range of programs is designed to equip you with the skills and knowledge needed to excel in an ever-evolving global landscape.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="btn bg-green-600 hover:bg-green-700 border-none text-white px-10 font-bold uppercase tracking-widest shadow-lg shadow-green-200 dark:shadow-none hover:scale-105 transition-all">
              Explore Programs
            </button>
            <button className="btn btn-outline border-green-600 text-green-600  px-8">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="relative flex justify-center items-center order-1 md:order-2 pt-10 md:pt-0">
          <div className="relative w-full max-w-[500px] group">
            <img 
              src="https://images.unsplash.com/photo-1762475833699-53a01f26565a?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="University Campus Life" 
              className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-700 group-hover:scale-[1.02] grayscale-[20%] group-hover:grayscale-0"
            />
            
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-green-500/20 -z-10 rounded-2xl transition-all group-hover:translate-x-2 group-hover:translate-y-2"></div>
            
            {/* Green Badge */}
            <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-xl">
              Est. 1996
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Study;