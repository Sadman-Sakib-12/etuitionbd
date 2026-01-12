import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { CreditCard, Calendar, Hash, CheckCircle, Clock, XCircle, DollarSign, ArrowDownLeft } from 'lucide-react';
import LoadingSpin from '../../../componet/LoadingSpin';

const PaymentHistory = () => {
  const { user } = useAuth();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  });

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpin /></div>;

  return (
    <div className="p-4 md:p-10 ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black  tracking-tight">Payment History</h2>
          <p className=" font-medium mt-2 flex items-center gap-2">
            <CreditCard size={16} /> Track all your financial transactions and receipts
          </p>
        </div>
        
        {/* Total Spent Summary Card */}
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center gap-5 min-w-[240px]">
          <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Spend</p>
            <p className="text-2xl font-black text-slate-800">
              ${data.reduce((acc, curr) => acc + (curr.amount || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className=" border-b border-slate-100">
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Receipt ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <div className="opacity-30 flex flex-col items-center">
                      <ArrowDownLeft size={48} className="mb-4" />
                      <p className="text-xl font-black">No transactions yet</p>
                      <p className="text-sm">Your payment records will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((payment) => (
                  <tr key={payment._id} className="group ">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-colors shadow-sm">
                          <Hash size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Tutor ID</p>
                          <p className="text-xs text-slate-400 font-mono uppercase">{payment.tutorId.slice(-10)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-lg font-black text-slate-800">${payment.amount}</p>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">USD Currency</p>
                    </td>
                    <td className="px-6 py-6 text-slate-500 font-bold text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(payment.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        payment.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        payment.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {payment.status === 'Success' && <CheckCircle size={12} />}
                        {payment.status === 'Pending' && <Clock size={12} />}
                        {payment.status === 'Failed' && <XCircle size={12} />}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <code className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        {payment.transactionId}
                      </code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;