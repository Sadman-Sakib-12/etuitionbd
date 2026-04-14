import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Briefcase, MapPin, GraduationCap, DollarSign, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import EditModal from '../../../componet/Modal/EditModal';
import LoadingSpin from '../../../componet/LoadingSpin';

const MyTuitions = () => {
  const [editingTuition, setEditingTuition] = useState(null);

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  });

  // Fetch all tuitions
  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition');
      return res.data;
    }
  });

  // Delete Tuition
  const handleDelete = async (tuition) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl px-6 py-2',
        cancelButton: 'rounded-xl px-6 py-2'
      }
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/tuition/${tuition._id}`);
      refetch();
      Swal.fire('Deleted!', 'Tuition post has been removed.', 'success');
    }
  };

  // Update Tuition
  const handleUpdate = async () => {
    await axiosSecure.patch(`/tuition/${editingTuition._id}`, {
      subject: editingTuition.subject,
      level: editingTuition.level,
      salary: editingTuition.salary,
      location: editingTuition.location,
      mode: editingTuition.mode,
      daysPerWeek: editingTuition.daysPerWeek,
      time: editingTuition.time,
      status: 'Pending'
    });

    refetch();
    Swal.fire({
      title: 'Updated!',
      text: 'Tuition sent for re-approval.',
      icon: 'success',
      customClass: { popup: 'rounded-[2rem]' }
    });
    setEditingTuition(null);
  };

  if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpin /></div>;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">My Tuitions</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage your tuition requests</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Posts</p>
            <p className="text-lg font-bold text-slate-800 leading-none">{data.length}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Tuition</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Location</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Salary</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Mode / Days / Time</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <Briefcase size={48} className="mb-4" />
                      <p className="text-lg font-bold">No tuitions found</p>
                      <p className="text-sm">You haven't posted any tuition requests yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map(tuition => (
                  <tr key={tuition._id} className="group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold shadow-sm">
                          {tuition.subject.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-base">{tuition.subject}</p>
                          <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                            <GraduationCap size={12} /> Level: {tuition.level}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <MapPin size={14} className="text-slate-400" />
                        {tuition.location}
                      </div>
                    </td>
                    <td className="px-6 py-6 font-black text-slate-700">
                      <span className="text-slate-400 font-bold mr-0.5">$</span>{tuition.salary}
                    </td>
                    <td className="px-6 py-6">
                      <p>{tuition.mode} / {tuition.daysPerWeek} days / {tuition.time}</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        tuition.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        tuition.status === 'Rejected' ? 'bg-red-50 text-red-500 border border-red-100' :
                        'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>{tuition.status}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex justify-center items-center gap-5">
                        {(tuition.status === 'Pending' || tuition.status === 'Rejected') && (
                          <>
                            <button
                              onClick={() => setEditingTuition(tuition)}
                              className="p-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
                              title="Edit Tuition"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(tuition)}
                              className="p-3 border border-slate-200 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-sm"
                              title="Delete Tuition"
                            >
                              <FaTrash size={14} />
                            </button>
                          </>
                        )}
                        {tuition.status === 'Approved' && (
                          <span className="text-xs font-bold italic">No actions</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTuition && (
        <EditModal
          editingTuition={editingTuition}
          setEditingTuition={setEditingTuition}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyTuitions;