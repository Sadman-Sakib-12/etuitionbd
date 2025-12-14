import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Applymodal from '../componet/Modal/Applymodal';

const Tuitions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition');
      return res.data;
    }
  });

  const tuition = data || [];


  const approvedTuitions = tuition.filter(
    t => t.status === 'Approved' && t.subject && t.location
  );


  const filteredTuitions = useMemo(() => {
    return approvedTuitions.filter(t =>
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

  if (isLoading) return <p>Loading tuitions...</p>;
  if (error) return <p>Error loading tuitions</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-40px)]">
      <h1 className="text-2xl font-bold mb-4">Available Tuitions</h1>


      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by subject or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">Sort By</option>
          <option value="budget-asc">Budget: Low to High</option>
          <option value="budget-desc">Budget: High to Low</option>
          <option value="date-asc">Date: Oldest First</option>
          <option value="date-desc">Date: Newest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedTuitions.map((tuition) => (
          <div key={tuition._id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">{tuition.subject}</h3>
              <p>Class: {tuition.class}</p>
              <p>Location: {tuition.location}</p>
              <p>Budget: ${tuition.budget}</p>
            </div>
            <button
              onClick={() => {
                setSelectedTuition(tuition);
                setIsOpen(true);
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        ))}
      </div>


      {isOpen && selectedTuition && (
        <Applymodal
          setIsOpen={setIsOpen}
          tuition={selectedTuition}
        />
      )}


      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tuitions;
