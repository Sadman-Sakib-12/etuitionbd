import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1470&q=80',
];

const Hero= () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${images[currentIndex]}')` }}
        />
      </AnimatePresence>


      <div className="absolute inset-0 bg-black/60 dark:bg-black/75" />
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
        <motion.div 
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-emerald-500"
        />
      </div>


      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl"
        >
          Find the <span className="text-emerald-400">Best Tutors</span> <br /> 
          for Your Needs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Connect with verified tutors and manage your classes effortlessly.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-xl"
        >
          Get Started Now
        </motion.button>
      </div>


      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 hidden md:flex">
        <button 
          onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        >
          <FaChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        >
          <FaChevronRight size={24} />
        </button>
      </div>


      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 z-20 flex flex-col items-center cursor-pointer"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
        <FaChevronDown size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;