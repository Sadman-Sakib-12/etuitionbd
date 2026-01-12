import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "How to Choose the Right Tutor for Your Child",
      desc: "Finding the perfect match for your child's learning style is crucial for academic success...",
      date: "Oct 12, 2025",
      author: "Admin",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Top 5 Benefits of Personalized 1-on-1 Tuition",
      desc: "Discover why individual attention can transform a student's confidence and grade...",
      date: "Nov 05, 2025",
      author: "Sarah Khan",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Balancing School and Private Tutoring",
      desc: "Practical tips for managing time without burnout for both students and parents...",
      date: "Dec 10, 2025",
      author: "Dr. Rahim",
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Educational <span className="text-orange-500">Insights</span></h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">Stay updated with the latest trends in education and tutoring tips.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div whileHover={{ y: -10 }} key={blog.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col">
              <img src={blog.img} className="h-56 w-full object-cover" alt={blog.title} />
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-3 leading-tight">{blog.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">{blog.desc}</p>
                <button className="flex items-center gap-2 text-orange-500 font-black text-sm group">
                  Read Article <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;