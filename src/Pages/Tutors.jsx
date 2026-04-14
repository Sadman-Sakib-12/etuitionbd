import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { GraduationCap, Banknote, Clock, ExternalLink, ShieldCheck, MapPin, Search, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSpin from '../componet/LoadingSpin';

const Tutors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const filteredTutors = useMemo(() => {
    const allTutors = data || [];
    return allTutors.filter((tutor) => {
      const isApproved = tutor.status === 'Approved';
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = 
        tutor.name?.toLowerCase().includes(searchStr) ||
        tutor.location?.toLowerCase().includes(searchStr) ||
        tutor.subject?.toLowerCase().includes(searchStr);

      return isApproved && (searchTerm === "" || matchesSearch);
    });
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const paginatedTutors = filteredTutors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <LoadingSpin />;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 transition-all">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-base-300 pb-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              Verified <span className="text-emerald-600">Tutors</span>
            </h1>
            <p className="text-base-content/70">Total {filteredTutors.length} mentors available</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
            <input 
              type="text" 
              placeholder="Search tutor, location or subject..." 
              className="input input-bordered w-full pl-12 rounded-2xl focus:border-emerald-500 bg-base-200/50"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedTutors.map((tutor) => (
            <div key={tutor._id} className="card bg-base-100 border border-base-300 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
              <figure className="px-6 pt-8">
                <div className="avatar relative">
                  <div className="w-24 h-24 rounded-3xl ring-4 ring-emerald-50 overflow-hidden">
                    <img src={tutor.profileImage || "https://i.ibb.co/5GzXkwq/user.png"} className="group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-lg border-2 border-base-100 shadow-lg">
                    <ShieldCheck size={14} />
                  </div>
                </div>
              </figure>

              <div className="card-body items-center text-center p-6">
                <h2 className="card-title font-black text-lg group-hover:text-emerald-600 transition-colors">{tutor.name}</h2>
                
                <div className="flex flex-wrap justify-center gap-1.5 mb-2 mt-2">
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-base-200 px-2 py-1 rounded-lg"><MapPin size={10} className="text-emerald-500" />{tutor.location}</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-base-200 px-2 py-1 rounded-lg"><BookOpen size={10} className="text-emerald-500" />{tutor.subject}</span>
                </div>

                <div className="badge border-none text-emerald-700 font-bold text-[10px] uppercase py-3 px-4 bg-emerald-50 mt-2">
                  <GraduationCap size={12} className="mr-1" /> {tutor.qualifications || 'Educator'}
                </div>

                <div className="flex w-full mt-6 border-t border-base-200 pt-4">
                  <div className="flex-1 text-center border-r border-base-200">
                    <span className="text-[10px] font-black text-base-content/30 block">EXP</span>
                    <span className="font-bold text-sm text-emerald-600">{tutor.experience || 0} Yrs</span>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[10px] font-black text-base-content/30 block">SALARY</span>
                    <span className="font-bold text-sm text-emerald-600">৳{tutor.expectedSalary}</span>
                  </div>
                </div>

                <button onClick={() => navigate(`/tutor/${tutor._id}`)} className="btn bg-emerald-600 hover:bg-emerald-700 border-none btn-block rounded-2xl mt-6 text-white font-bold">
                  View Profile <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <div className="join bg-base-200 border border-base-300 rounded-2xl">
              <button disabled={currentPage === 1} onClick={() => { setCurrentPage(p => p - 1); window.scrollTo(0,0); }} className="join-item btn btn-ghost text-emerald-600"><ChevronLeft/></button>
              <button className="join-item btn btn-ghost no-animation text-xs font-black px-6">PAGE {currentPage} OF {totalPages}</button>
              <button disabled={currentPage === totalPages} onClick={() => { setCurrentPage(p => p + 1); window.scrollTo(0,0); }} className="join-item btn btn-ghost text-emerald-600"><ChevronRight/></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutors;