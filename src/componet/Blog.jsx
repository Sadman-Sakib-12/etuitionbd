import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <BookOpen size={14}/> Our Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Educational <span className="text-emerald-600">Insights</span></h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">Stay updated with the latest trends in education and tutoring tips.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }} 
                key={blog._id} 
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden">
                  <img src={blog.img} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={blog.title} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-black uppercase text-emerald-600">Article</div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                    {blog.title}
                </h3>

                {/* dangerouslySetInnerHTML allows rendering the Word-style formatting */}
                <div 
                    className="text-slate-500 text-sm mb-6 line-clamp-3 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: blog.desc }} 
                />

                <div className="mt-auto border-t border-slate-50 pt-6">
                    <button className="flex items-center gap-2 text-emerald-600 font-black text-sm group/btn">
                        Read Full Story 
                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;