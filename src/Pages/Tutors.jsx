import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { GraduationCap, Briefcase, DollarSign, UserCheck, ArrowRight, Star } from 'lucide-react';
import LoadingSpin from '../componet/LoadingSpin';

const Tutors = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['allTutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutor');
      return res.data;
    },
  });

  const approvedTutors = (data || []).filter((t) => t.status === 'Approved');

if (isLoading) return (

    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">

          {Array.from({ length: 8 }).map((_, idx) => (

            <LoadingSpin key={idx} />

          ))}

        </div>

      </div>

    </div>

  );

  return (
    <div className="min-h-screen  pt-2 pb-2 px-4">
      <div className="max-w-7xl mx-auto">
        

        <div className="text-center mb-16">
          <motion-div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <Star size={14} fill="currentColor" /> Our Elite Educators
          </motion-div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Expert Tutors</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Find the perfect mentor to guide your journey. Our verified tutors are experts in their respective fields.
          </p>
        </div>

        {approvedTutors.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <span className="text-6xl mb-6 block">🎓</span>
            <h3 className="text-2xl font-black text-slate-800 mb-2">No Tutors Available</h3>
            <p className="text-slate-400 font-medium">We are currently vetting new tutors. Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {approvedTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="group  rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-500 flex flex-col relative overflow-hidden"
              >
    
                <div className="absolute top-0 right-0 w-20 h-20  rounded-bl-[3rem] -z-0 group-hover:bg-indigo-100 transition-colors" />


                <div className="relative z-10 flex flex-col items-center mb-6">
                  <div className="relative">
                    <img
                      src={tutor.profileImage}
                      alt={tutor.name}
                      className="w-32 h-32 object-cover rounded-[2rem] border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-xl border-4 border-white  shadow-lg">
                      <UserCheck size={14} strokeWidth={3} />
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-black  group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {tutor.name}
                  </h3>
                  <div className="flex items-center gap-1  font-bold text-[10px] uppercase tracking-widest mt-1">
                    <GraduationCap size={12} /> {tutor.qualifications || 'Expert'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                  <div className="p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-black  uppercase tracking-tighter">Experience</span>
                    <span className="text-sm font-bold ">{tutor.experience || 0}+ Years</span>
                  </div>
                  <div className="p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-black uppercase tracking-tighter">Salary</span>
                    <span className="text-sm font-bold ">{tutor.expectedSalary} BDT</span>
                  </div>
                </div>


                <button
                  onClick={() => navigate(`/tutor/${tutor._id}`)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 
                             text-white font-semibold py-5 rounded-xl 
                             shadow-md hover:shadow-xl transform hover:scale-[1.02] active:scale-100"
                  >
                  View Profile
              
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutors;