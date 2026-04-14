import React, { useEffect, useState } from "react";
import axios from "axios";
import { GraduationCap, Briefcase, Banknote, ArrowRight, Verified, User, MapPin, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tutor`);

        // ✅ FIX: backend ইতিমধ্যে appliedAt: -1 sort করে পাঠাচ্ছে
        // এখানে শুধু Approved ফিল্টার করলেই হবে
        const approvedTutors = res.data.filter((t) => t.status === "Approved");

        // ✅ FIX: appliedAt না থাকলে createdAt বা 0 দিয়ে fallback
        const sorted = approvedTutors.sort(
          (a, b) =>
            new Date(b.appliedAt || b.createdAt || 0) -
            new Date(a.appliedAt || a.createdAt || 0)
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

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32">
      <span className="loading loading-ring loading-lg text-green-600"></span>
    </div>
  );

  return (
    <section className="py-16 text-base-content">
      <div className="container mx-auto px-6 max-w-7xl">

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Featured <span className="text-green-600">Tutors</span>
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto leading-relaxed">
           The list of new and verified tutors who have applied is given below.
          </p>
        </div>

        {tutors.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300">
            <User size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-bold opacity-40">No tutors available. Please check DB status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {tutors.map((tutor, idx) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card bg-base-200 shadow-sm hover:shadow-2xl border border-base-300 hover:border-green-500/30 transition-all duration-500 group overflow-hidden rounded-[2.5rem]"
              >
                <div className="card-body p-8 items-center text-center">

                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-[2rem] overflow-hidden ring-4 ring-base-100 group-hover:ring-green-500/20 shadow-xl">
                      <img
                        src={tutor.profileImage || "https://i.ibb.co/5GzXkwq/user.png"}
                        alt={tutor.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          // ✅ FIX: image load fail হলে fallback
                          e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1.5 rounded-xl border-4 border-base-200">
                      <Verified size={16} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black group-hover:text-green-600 transition-colors">
                    {tutor.name || "Unknown Tutor"}
                  </h3>

                  {/* ✅ FIX: location এবং subject সবসময় দেখাবে, fallback আছে */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-base-300/50 rounded-lg text-[11px] font-bold">
                      <MapPin size={12} className="text-green-600" />
                      {tutor.location && tutor.location !== "Not specified"
                        ? tutor.location
                        : "Location N/A"}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-base-300/50 rounded-lg text-[11px] font-bold">
                      <BookOpen size={12} className="text-green-600" />
                      {tutor.subject || "General"}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="w-full grid grid-cols-2 gap-4 py-6 border-t border-base-300">
                    <div className="space-y-1 border-r border-base-300">
                      <p className="text-[10px] opacity-50 font-black uppercase tracking-widest">Experience</p>
                      <div className="flex items-center justify-center gap-2 font-bold text-sm">
                        <Briefcase size={14} className="text-green-500" />
                        {/* ✅ FIX: experience 0 হলেও দেখাবে */}
                        <span>{tutor.experience ?? 0} Years</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] opacity-50 font-black uppercase tracking-widest">Salary</p>
                      <div className="flex items-center justify-center gap-1 text-green-600 font-black text-lg">
                        <Banknote size={16} />
                        {/* ✅ FIX: salary না থাকলে N/A দেখাবে */}
                        <span>{tutor.expectedSalary ? `৳${tutor.expectedSalary}` : "N/A"}</span>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTutors;