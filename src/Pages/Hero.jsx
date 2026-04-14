import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const slideData = [
  {
    title: 'Education',
    sub: 'Education For Everyone',
    desc: "We provide our best services for our students and always try to achieve our client's trust and satisfaction.",
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1470&q=80',
    thumb: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=120&q=60',
  },
  {
    title: 'Learn & Grow',
    sub: 'Connect With Best Tutors',
    desc: 'Find verified tutors for every subject. Start learning today and unlock your true academic potential.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80',
    thumb: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=120&q=60',
  },
  {
    title: 'Achieve More',
    sub: 'Smart Matching Technology',
    desc: 'Our platform matches students with the perfect tutor based on subject, budget, and location needs.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1470&q=80',
    thumb: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=120&q=60',
  },
];

const DURATION = 5000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (index) => {
    setCurrent((index + slideData.length) % slideData.length);
  };

  const move = (dir) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(current + dir);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo(current + 1);
    }, DURATION);
    return () => clearInterval(timerRef.current);
  }, [current]);

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden bg-slate-900">
      
      {/* Background Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${slideData[current].image}')` }}
        />
      </AnimatePresence>

      {/* Modern Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px]" />

      {/* Centered Content */}
      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: "anticipate" }}
            className="max-w-3xl"
          >
            {/* Subtitle Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                {slideData[current].sub}
              </span>
            </motion.div>

            {/* Big Title */}
            <h1 className="text-white font-black uppercase mb-6 leading-[1.1] text-4xl md:text-6xl lg:text-7xl tracking-tighter">
              {slideData[current].title}
            </h1>

            {/* Description */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto font-medium">
              {slideData[current].desc}
            </p>

            {/* CTA Buttons - Green Update */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#15803d' }} // green-700
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-colors shadow-lg shadow-green-500/20"
              >
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-[14px] rounded-sm font-bold uppercase tracking-widest text-xs transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="hidden lg:flex absolute inset-x-8 top-1/2 -translate-y-1/2 justify-between z-30 pointer-events-none">
        <NavButton onClick={() => move(-1)} icon={<FaChevronLeft size={20} />} />
        <NavButton onClick={() => move(1)} icon={<FaChevronRight size={20} />} />
      </div>

      {/* Thumbnail Indicators - Green Ring */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slideData.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative overflow-hidden rounded-lg transition-all duration-500 group ${
              i === current ? 'w-16 h-16 ring-2 ring-green-500 scale-110' : 'w-12 h-12 opacity-50 hover:opacity-100'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-120" 
              style={{ backgroundImage: `url('${s.thumb}')` }}
            />
          </button>
        ))}
      </div>

      {/* Animated Scroll Down */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-10 z-30 hidden md:flex flex-col items-center gap-2 cursor-pointer text-white/40 hover:text-green-400 transition-colors"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.4em] rotate-90 mb-4">Explore</span>
        <FaChevronDown size={16} />
      </motion.div>
    </section>
  );
};

const NavButton = ({ onClick, icon }) => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center text-white backdrop-blur-md bg-white/10 border border-white/20 transition-all"
  >
    {icon}
  </motion.button>
);

export default Hero;