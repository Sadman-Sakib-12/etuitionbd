import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Clock, Calendar, BookOpen, ArrowRight, User, Banknote } from "lucide-react";
import { Link } from "react-router";

const LatestTutionPost = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tuition`);
        
        const approved = res.data.filter((t) => t.status === "Approved");
        const sorted = approved.sort((a, b) => 
          new Date(b.posted || b.createdAt).getTime() - new Date(a.posted || a.createdAt).getTime()
        );

        setTuitions(sorted.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching tuitions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20 bg-base-100">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  );

  return (
    <section className="py-16 bg-base-100 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section (Optional addition for context) */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-base-content">
                Latest <span className="text-green-600">Tuition Jobs</span>
            </h2>
            <div className="h-1 w-20 bg-green-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-green-500/30 transition-all duration-300 flex flex-col group"
            >
              {/* Top: Icon & Salary */}
              <div className="flex justify-between items-start mb-5">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <BookOpen size={22} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-base-content/40 uppercase">Salary</p>
                  <p className="text-xl font-bold text-green-600 font-mono flex items-center justify-end gap-1">
                    <Banknote size={18} /> ৳{tuition.salary}
                  </p>
                </div>
              </div>

              {/* Subject & Badges */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-1 group-hover:text-green-700">
                  {tuition.subject}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold px-2 py-1 rounded-md">{tuition.level}</span>
                  <span className="bg-base-200 text-base-content/70 text-[10px] font-bold px-2 py-1 rounded-md">{tuition.mode}</span>
                </div>
              </div>

              {/* Info Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <MapPin size={14} className="text-green-600" />
                  <span className="truncate">{tuition.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <Clock size={14} className="text-green-600" />
                  <span>{tuition.daysPerWeek} Days • {tuition.time}</span>
                </div>
                
                {/* User & Date */}
                <div className="flex items-center justify-between pt-4 border-t border-base-200 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <User size={12} className="text-green-600" />
                    </div>
                    <span className="text-xs font-medium text-base-content/60">{tuition?.student?.name || 'User'}</span>
                  </div>
                  <span className="text-[10px] text-base-content/40 flex items-center gap-1">
                    <Calendar size={12} className="text-green-600/50" /> {new Date(tuition.posted || tuition.createdAt).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            to="/tuitions" 
            className="group btn border-green-600 text-green-600  rounded-full px-10 gap-2 normal-case font-bold transition-all shadow-lg "
          >
            Browse All Posts <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default LatestTutionPost;