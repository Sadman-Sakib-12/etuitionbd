import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Applymodal from '../componet/Modal/Applymodal';
import LoadingSpin from '../componet/LoadingSpin';

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

  const { data, isLoading, error } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition');
      return res.data;
    },
  });

  const tuitions = data || [];
  const approvedTuitions = tuitions.filter(
    (t) => t.status === 'Approved' && t.subject && t.location
  );

  const filteredTuitions = useMemo(() => {
    return approvedTuitions.filter(
      (t) =>
        (t.subject?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (t.location?.toLowerCase() || '').includes(search.toLowerCase())
    );
  }, [approvedTuitions, search]);

  const sortedTuitions = useMemo(() => {
    if (sort === 'budget-asc') return [...filteredTuitions].sort((a, b) => a.budget - b.budget);
    if (sort === 'budget-desc') return [...filteredTuitions].sort((a, b) => b.budget - a.budget);
    if (sort === 'date-asc') return [...filteredTuitions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === 'date-desc') return [...filteredTuitions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return filteredTuitions;
  }, [filteredTuitions, sort]);

  const totalPages = Math.ceil(sortedTuitions.length / itemsPerPage);
  const paginatedTuitions = sortedTuitions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl">
        {Array.from({ length: itemsPerPage }).map((_, idx) => (
          <LoadingSpin key={idx} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold   mb-8 tracking-tight">
          Available Tuitions
        </h1>


        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by subject or location..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 p-3.5  border-gray-600  rounded-xl 
          
                       focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-non transition-all"
          />
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
            className="p-3.5  border border-gray-300 rounded-xl 
                       text-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="">Sort By</option>
            <option value="budget-asc">Budget: Low to High</option>
            <option value="budget-desc">Budget: High to Low</option>
            <option value="date-asc">Date: Oldest First</option>
            <option value="date-desc">Date: Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {paginatedTuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="group  rounded-2xl overflow-hidden 
                         border 
                         shadow-lg 
                         hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/40
                         transition-all duration-300 ease-out flex flex-col h-full 
                         transform hover:-translate-y-1"
            >

              <div className="px-6 pt-6 pb-4 border-b ">
                <h3 className="text-xl md:text-2xl font-semibold  ">
                  {tuition.subject}
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-500">
                  {tuition.class} • {tuition.location}
                </p>
              </div>


              <div className="px-6 py-6 flex-grow space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm  font-medium ">Monthly Budget</span>
                  <span className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${tuition.budget}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className=" font-medium">Location</p>
                    <p className=" mt-1">{tuition.location}</p>
                  </div>
                  <div>
                    <p className=" font-medium">Posted</p>
                    <p className="font-semibold mt-1">
                      {new Date(tuition.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>


              <div className="px-6 pb-6 mt-auto">
                <button
                  onClick={() => {
                    setSelectedTuition(tuition);
                    setIsOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 
                             text-white font-semibold py-3.5 rounded-xl transition-all duration-300 
                             shadow-md hover:shadow-xl transform hover:scale-[1.02] active:scale-100"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>


        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg 
                         text-gray-700 dark:text-gray-200 font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Previous
            </button>
            <span className=" font-medium text-lg">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-2.5  dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg 
                         text-gray-700 dark:text-gray-200 font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {isOpen && selectedTuition && (
        <Applymodal setIsOpen={setIsOpen} tuition={selectedTuition} />
      )}
    </div>
  );
};

export default Tuitions;