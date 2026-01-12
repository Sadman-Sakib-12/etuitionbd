import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, DollarSign, Mail, Calendar, UserCheck, ArrowLeft } from "lucide-react";
import LoadingSpin from "./LoadingSpin";
import { Link } from "react-router";

const ViewProfile = () => {
  const { id } = useParams();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpin /></div>;

  if (!tutor) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl font-bold text-slate-500">No tutor found</p>
        <Link to="/tutors" className="mt-4 text-orange-500 font-bold underline">Back to Tutors</Link>
    </div>
  );

  return (
    <div className="min-h-screen  py-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link to="/tutors" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 font-bold mb-8 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to All Tutors
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" rounded-[3rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100"
        >

          <div className="px-8 md:px-12 pb-12">
            <div className="relative mt-1 flex flex-col md:flex-row items-end gap-6 mb-8">
              <div className="relative">
                <img
                  src={tutor.profileImage || "https://i.ibb.co/v3978yP/default-avatar.jpg"}
                  alt={tutor.name}
                  className="w-40 h-40 rounded-[2.5rem] object-cover border-8 border-white shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 bg-emerald-500 p-2 rounded-xl border-4 border-white text-white">
                  <UserCheck size={16} strokeWidth={3} />
                </div>
              </div>

              <div className="flex-1 pb-2">
                <h1 className="text-3xl md:text-4xl font-black ">{tutor.name}</h1>
                <p className=" font-bold flex items-center gap-2 uppercase tracking-widest text-sm mt-1">
                  <GraduationCap size={18} /> {tutor.qualifications}
                </p>
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-orange-200 transition-all active:scale-95">
                Hire This Tutor
              </button>
            </div>

            <hr className="border-slate-100 mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Professional Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4  p-4 rounded-2xl border border-slate-100">
                      <div className="p-3 rounded-xl  shadow-sm"><Briefcase size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold  uppercase">Experience</p>
                        <p className="font-bold ">{tutor.experience} Years of Teaching</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4  p-4 rounded-2xl border border-slate-100">
                      <div className=" p-3 rounded-xl  shadow-sm"><DollarSign size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black  uppercase">Expected Salary</p>
                        <p className="font-bold ">{tutor.expectedSalary} BDT / Month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Other Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4  p-4 rounded-2xl border border-slate-100">
                      <div className="p-3 rounded-xl text-slate-600 shadow-sm"><Mail size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase">Email Address</p>
                        <p className="font-bold  truncate">{tutor.email || 'Contact via Platform'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4  p-4 rounded-2xl border border-slate-100">
                      <div className=" p-3 rounded-xl text-slate-600 shadow-sm"><Calendar size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Status</p>
                        <p className="font-bold text-emerald-600">Verified Educator</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-12 bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex gap-4 items-start">
               <div className="text-indigo-600 mt-1"><UserCheck size={20}/></div>
               <p className="text-indigo-800 text-sm font-medium leading-relaxed">
                 This profile has been manually reviewed and approved by the <strong>TuitionHub</strong> administration. 
                 The educational qualifications provided are verified against the submitted documents.
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewProfile;