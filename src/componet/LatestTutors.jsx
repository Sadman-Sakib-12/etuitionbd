import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, DollarSign, Calendar } from "lucide-react"; 

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tutor`);
        const approvedTutors = res.data.filter((t) => t.status === "Approved");
        
        const sorted = approvedTutors.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTutors(sorted.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <div className="text-center py-20 font-bold text-indigo-600">Loading Latest Tutors...</div>;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Featured Tutors</h2>
            <p className="text-slate-500 font-medium">Meet our recently joined and highly qualified educators.</p>
          </div>
        </div>

        {tutors.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-medium italic underline">No tutors available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {tutors.map((tutor, index) => (
                <motion.div
                  key={tutor._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group  rounded-[2rem] p-6 shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 relative overflow-hidden"
                >
                 
                  <div className="absolute top-0 right-0 w-24 h-24  rounded-bl-[4rem] -z-0 transition-transform group-hover:scale-110" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-6">
                      <img
                        src={tutor.profileImage || "/default-avatar.jpg"}
                        alt=""
                        className="w-28 h-28 rounded-3xl object-cover shadow-lg border-4 border-white ring-1 ring-slate-100"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" title="Verified" />
                    </div>

                    <h3 className="text-xl font-black  mb-1 group-hover:text-indigo-600 transition-colors">
                      {tutor.name}
                    </h3>
                    
                    <div className="flex items-center gap-1  font-bold text-xs uppercase tracking-widest mb-4">
                       <GraduationCap size={14} /> {tutor.qualifications || 'Expert Educator'}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 mb-6">
                      <div className=" p-3 rounded-2xl text-center">
                        <p className="text-[10px]  font-bold uppercase tracking-tighter">Experience</p>
                        <p className="text-sm font-bold">{tutor.experience} Years</p>
                      </div>
                      <div className=" p-3 rounded-2xl text-center">
                        <p className="text-[10px]  font-bold uppercase tracking-tighter">Expected</p>
                        <p className="text-sm font-bold ">{tutor.expectedSalary} BDT</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTutors;