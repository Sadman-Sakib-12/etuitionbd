import React, { useEffect, useState } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const LatestTutionPost = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tuition`);
        const approvedTutors = res.data.filter(t => t.status === "Approved");
        const sorted = approvedTutors.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTutors(sorted);
      } catch (error) {
        console.error("Error fetching tuitions:", error);
      }
    };

    fetchTutors();
  }, []);

  return (
    <section className="p-6 bg-gray-100">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Latest Tuition Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <AnimatePresence>
          {tutors.map((tuitor, index) => (
            <motion.div
              key={tuitor._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Image Header */}
              <div className=" to-green-600 p-5 flex justify-center items-center relative">
                <motion.img
                  src={tuitor.profileImage || "/default-avatar.png"} 
                  alt=''
                  className="w-28 h-28 rounded-full border-4 border-blue-800 object-cover shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
              </div>

              {/* Card Content */}
              <div className="p-6 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{tuitor.subject}</h3>
                  <p className="text-gray-600 mb-1 font-medium">Class: {tuitor.class}</p>
                  <p className="text-gray-600 mb-1 font-medium">Location: {tuitor.location}</p>
                  <p className="text-green-600 font-bold mt-2 text-lg">Budget: ${tuitor.budget}</p>
                </div>
                
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LatestTutionPost;
