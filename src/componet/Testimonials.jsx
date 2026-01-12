import React from 'react'
import { motion } from 'framer-motion';
const Testimonials = () => {
 const testimonials = [
    {
      name: "Sumaiya Akter",
      role: "Parent, Dhaka",
      text: "Found an excellent physics tutor for my HSC student within just 3 days. The verification system really gives confidence. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&auto=format&fit=crop"
    },
    {
      name: "Rakib Hossain",
      role: "Tutor, Chittagong",
      text: "As a tutor I get quality students regularly. The platform is fair, payments are secure and support team is very responsive.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&auto=format&fit=crop"
    },
    {
      name: "Farhan Ahmed",
      role: "Student, Class 10",
      text: "My English improved a lot in just two months. Madam teaches very nicely and always encourages me. Thank you TuitionHub!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="mt-12 grid md:grid-cols-3 gap-8">
      {testimonials.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          viewport={{ once: true }}
          className=" rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative"
        >
          <div className="absolute -top-4 left-6 w-14 h-14 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
            <img 
              src={item.avatar} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-1 mb-5 mt-4 text-yellow-400">
            {'★'.repeat(item.rating)}
          </div>

          <p className=" mb-6 italic leading-relaxed">
            "{item.text}"
          </p>

          <div>
            <h4 className="font-bold ">
              {item.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.role}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Testimonials