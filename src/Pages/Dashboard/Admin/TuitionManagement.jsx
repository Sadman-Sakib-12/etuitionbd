import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CheckCircle, XCircle, Clock, MapPin, GraduationCap, DollarSign, LayoutGrid } from 'lucide-react';
import LoadingSpin from '../../../componet/LoadingSpin';
import Swal from 'sweetalert2';

const TuitionManagement = () => {
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  });

  // Fetch all tuition requests
  const { data: tuitions = [], refetch, isLoading } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition');
      return res.data;
    },
  });

  // Mutation to update tuition status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/tuition/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: 'Status Updated',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        customClass: { popup: 'rounded-2xl' }
      });
    }
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpin />
    </div>
  );

  return (
    <div className="p-4 md:p-10 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight">Tuition Requests</h2>
          <p className=" font-medium mt-2 flex items-center gap-2">
            <LayoutGrid size={16} /> Review and manage student tuition postings
          </p>
        </div>

        {/* Pending Count */}
        <div className="bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100 flex items-center gap-3">
          <Clock className="text-amber-500 animate-pulse" size={20} />
          <div>
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none">Awaiting Review</p>
            <p className="text-xl font-black text-slate-800">{tuitions.filter(t => t.status === 'Pending').length}</p>
          </div>
        </div>
      </div>

      {/* Tuition Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tuitions.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-lg">No tuition requests found at the moment.</p>
          </div>
        ) : (
          tuitions.map((t) => (
            <div key={t._id} className="rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">

              {/* Card Header */}
              <div className="p-8 pb-0 flex justify-between items-start">
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm bg-slate-100">
                  {t.subject.charAt(0)}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  t.status === 'Approved' ? 'text-emerald-600 border-emerald-100' :
                  t.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {t.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 space-y-5 flex-1">
                <div>
                  <h3 className="text-2xl font-black leading-tight">{t.subject}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider mt-1">Requested by: {t.student?.name || 'Anonymous'}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <GraduationCap size={16} />
                    <span>Class: {t.level}</span>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <MapPin size={16} />
                    <span>Location: {t.location}</span>
                  </div>
                  <div className="flex items-center gap-3 font-black text-lg pt-2">
                    <DollarSign size={20} className="text-emerald-500" />
                    <span>${t.salary}<span className="text-xs text-slate-400 font-medium tracking-normal ml-1">/ Monthly</span></span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-8 pb-8 pt-0">
                {t.status === 'Pending' ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus({ id: t._id, status: 'Approved' })}
                      className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus({ id: t._id, status: 'Rejected' })}
                      className="flex-1 border border-slate-200 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                ) : (
                  <div className="w-full py-4 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Decision Finalized</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TuitionManagement;