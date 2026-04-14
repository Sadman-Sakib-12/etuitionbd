import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Applymodal from '../componet/Modal/Applymodal';
import LoadingSpin from '../componet/LoadingSpin';
import { 
  MapPin, Clock, Search, Calendar, BookOpen, 
  ChevronLeft, ChevronRight, Briefcase, Banknote 
} from 'lucide-react';

const Tuitions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition');
      return res.data;
    },
  });

  // Approved এবং Filtered ডাটা প্রসেসিং
  const processedTuitions = useMemo(() => {
    let result = (data || []).filter((t) => t.status === 'Approved');

    if (search) {
      result = result.filter(
        (t) =>
          t.subject?.toLowerCase().includes(search.toLowerCase()) ||
          t.location?.toLowerCase().includes(search.toLowerCase()) ||
          t.level?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'budget-asc') result.sort((a, b) => a.salary - b.salary);
    if (sort === 'budget-desc') result.sort((a, b) => b.salary - a.salary);

    return result;
  }, [data, search, sort]);

  // Pagination Logic
  const totalPages = Math.ceil(processedTuitions.length / itemsPerPage);
  const paginatedTuitions = processedTuitions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // সার্চ করলে পেজ ১ এ ফেরত যাবে
  };

  if (isLoading) return <LoadingSpin />;

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
            Available <span className="text-emerald-600 italic">Tuitions</span>
          </h1>
          <p className="text-base-content/60 font-medium">Find the perfect teaching opportunity.</p>
        </div>

        {/* Search & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="md:col-span-3 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-emerald-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by subject, class, or location..."
              value={search}
              onChange={handleSearch}
              className="input input-bordered w-full pl-12 bg-base-100 border-base-300 focus:border-emerald-500 transition-all shadow-sm rounded-2xl"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
            className="select select-bordered bg-base-100 border-base-300 font-bold rounded-2xl"
          >
            <option value="">Sort by Salary</option>
            <option value="budget-asc">Low to High</option>
            <option value="budget-desc">High to Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedTuitions.map((tuition) => (
            <div key={tuition._id} className="card bg-base-200 border border-base-300 hover:border-emerald-500/40 transition-all duration-300 shadow-sm hover:shadow-xl rounded-3xl overflow-hidden group">
              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <BookOpen size={24} />
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-black text-base-content/30 uppercase">Post Date</span>
                     <p className="text-[11px] font-bold text-base-content/60">{new Date(tuition.posted || tuition.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-base-content line-clamp-1 group-hover:text-emerald-600 transition-colors">{tuition.subject}</h3>
                
                <div className="flex gap-2 mt-2 mb-4">
                  <span className="badge badge-sm bg-emerald-50 border-emerald-100 text-emerald-700 font-bold text-[10px]">{tuition.level}</span>
                  <span className="badge badge-sm bg-base-300 border-none text-[10px] font-bold">{tuition.mode}</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-base-content/70"><MapPin size={16} className="text-emerald-600" /><span className="truncate">{tuition.location}</span></div>
                  <div className="flex items-center gap-3 text-sm text-base-content/70"><Clock size={16} className="text-emerald-600" /><span>{tuition.daysPerWeek} Days • {tuition.time}</span></div>
                  <div className="flex items-center gap-3 text-sm text-base-content/70"><Briefcase size={16} className="text-emerald-600" /><span>Class: {tuition.class}</span></div>
                </div>

                <div className="h-px bg-base-300 mb-4" />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-base-content/40 uppercase block">Salary</span>
                    <span className="text-xl font-black text-emerald-600 flex items-center gap-1"><Banknote size={18} /> ৳{tuition.salary}</span>
                  </div>
                  <button
                    onClick={() => { setSelectedTuition(tuition); setIsOpen(true); }}
                    className="btn bg-emerald-600 hover:bg-emerald-700 border-none btn-sm rounded-xl text-white font-bold"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join bg-base-200 border border-base-300 rounded-2xl overflow-hidden">
              <button disabled={currentPage === 1} onClick={() => { setCurrentPage(p => p - 1); window.scrollTo(0,0); }} className="join-item btn btn-ghost text-emerald-600"><ChevronLeft size={20}/></button>
              <button className="join-item btn btn-ghost no-animation text-xs font-black px-6 border-x border-base-300">PAGE {currentPage} OF {totalPages}</button>
              <button disabled={currentPage === totalPages} onClick={() => { setCurrentPage(p => p + 1); window.scrollTo(0,0); }} className="join-item btn btn-ghost text-emerald-600"><ChevronRight size={20}/></button>
            </div>
          </div>
        )}

        {isOpen && selectedTuition && <Applymodal setIsOpen={setIsOpen} tuition={selectedTuition} />}
      </div>
    </div>
  );
};

export default Tuitions;