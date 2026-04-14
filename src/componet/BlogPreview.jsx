import React from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, ChevronRight, ArrowRight, PlayCircle, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BlogPreview = () => {
  return (
    <div className=" text-base-content font-sans">
    
      {/* 3. BLOG PREVIEW SECTION (image_c3a97e.jpg অনুযায়ী) */}
      <section className="py-2 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Blog</span>
              <div className="h-[2px] w-8 bg-primary"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black">Get From Our News & Article</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { cat: "Uncategorized", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" },
              { cat: "Business", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800" },
              { cat: "Finance", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800" }
            ].map((post, idx) => (
              <motion.article 
                key={idx} 
                whileHover={{ y: -10 }} 
                className="bg-white dark:bg-base-200 rounded-[2rem] overflow-hidden border border-base-200 shadow-sm flex flex-col"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={post.img} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" alt="blog" />
                  <div className="absolute bottom-4 left-6">
                    <span className="badge bg-white dark:bg-neutral text-primary font-bold py-3.5 px-5 shadow-md border-none">{post.cat}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs opacity-50 font-bold mb-4">
                    <div className="flex items-center gap-1"><User size={14} className="text-primary"/>Sakib</div>
                    <div className="flex items-center gap-1"><MessageCircle size={14} className="text-primary"/> 0 Comments</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 flex-grow group-hover:text-primary cursor-pointer">Unlocking the power of strategies effective approach.</h3>
                  <p className="text-sm opacity-60 mb-6 line-clamp-2">Key factors every parent should consider when selecting a mathematics tutor — from teaching style to proven results.</p>
                  <div className="pt-6 border-t border-base-200">
                    <button className="btn btn-ghost rounded-xl gap-2 font-bold group">
                      Read More <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPreview;