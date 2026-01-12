import React from 'react'
import { motion } from 'framer-motion';
const BlogPreview = () => {
 const mockPosts = [
    {
      title: "How to Choose the Right Math Tutor for Your Child",
      excerpt: "Key factors every parent should consider when selecting a mathematics tutor — from teaching style to proven results.",
      date: "Jan 5, 2026",
      author: "Md. Rahim Khan",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
      link: "/blog/how-to-choose-math-tutor"
    },
    {
      title: "10 Effective Study Techniques That Actually Work",
      excerpt: "Proven methods used by top students — Pomodoro, active recall, spaced repetition and more.",
      date: "Dec 28, 2025",
      author: "Ayesha Siddiqua",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
      link: "/blog/effective-study-techniques"
    },
    {
      title: "Why Early Preparation is Key for University Admission",
      excerpt: "Timeline and strategy guide for students aiming for top public & private universities in Bangladesh.",
      date: "Dec 15, 2025",
      author: "Tanvir Ahmed",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
      link: "/blog/university-admission-preparation"
    }
  ];
  return (
    <div className="grid md:grid-cols-3 gap-7 mt-10">
      {mockPosts.map((post, index) => (
        <motion.article
          key={index}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className=" rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 text-sm  mb-3">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-3 line-clamp-2 transition-colors">
              {post.title}
            </h3>
            
            <p className=" text-sm line-clamp-3 mb-4">
              {post.excerpt}
            </p>
            
            <a
              href={post.link}
              className="inline-flex items-center text-emerald-600 dark:text-emerald-500 font-medium hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              Read More →
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default BlogPreview