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
    <section className="py-1 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Latest Tuition Posts
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {tutors.map((tuitor, index) => (
            <motion.div
              key={tuitor._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className=" rounded-xl border border-gray-300 shadow-sm overflow-hidden flex flex-col p-6 hover:shadow-md transition-shadow"
            >
            
              <div className="mb-4">
                <h3 className="text-2xl font-bold  capitalize">
                  {tuitor.subject}
                </h3>
                <p className=" font-medium">
                  {tuitor.class} • {tuitor.location}
                </p>
              </div>

              <hr className="border-gray-200 mb-6" />

           
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <span className=" font-bold">Monthly Budget</span>
                  <span className="text-2xl font-black text-[#10b981]">
                    ${tuitor.budget}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className=" font-semibold mb-1 uppercase tracking-tighter">Location</p>
                    <p className="font-bold truncate">{tuitor.location}</p>
                  </div>
                  <div className="text-right">
                    <p className=" font-semibold mb-1 uppercase tracking-tighter">Posted</p>
                    <p className=" font-bold">
                       {tuitor.createdAt }
                    </p>
                  </div>
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