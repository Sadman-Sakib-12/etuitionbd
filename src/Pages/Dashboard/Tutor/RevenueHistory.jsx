import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartLine, FaHistory, FaCalendarAlt, FaUser, FaDollarSign } from 'react-icons/fa';

const RevenueHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/payment`);
                setTransactions(res.data);
                const total = res.data.reduce((sum, t) => sum + t.amount, 0);
                setTotalRevenue(total);
            } catch (error) {
                console.error("Error fetching payments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-10 min-h-screen bg-base-100 text-base-content transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                                <FaChartLine size={24} />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">
                                Revenue <span className="text-green-600">History</span>
                            </h1>
                        </div>
                        <p className="text-base-content/60 font-medium italic">Detailed overview of your earnings and payments</p>
                    </div>
                </div>

                {/* --- Total Earnings Card (Hero Section) --- */}
                <div className="relative overflow-hidden rounded-[2.5rem] p-8 mb-10 shadow-xl bg-gradient-to-br from-green-600 to-green-800 text-white group">
                    <div className="relative z-10">
                        <h2 className="text-green-100 text-sm font-black uppercase tracking-[0.3em] mb-2 opacity-80">Total Earnings</h2>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl md:text-6xl font-black">${totalRevenue.toLocaleString()}</span>
                            <span className="text-green-200 font-bold">USD</span>
                        </div>
                    </div>
                    
                    {/* Decorative Background Icon */}
                    <FaDollarSign 
                        size={150} 
                        className="absolute -right-6 -bottom-6 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700" 
                    />
                </div>

                {/* --- Transactions Table --- */}
                <div className="card bg-base-200 shadow-sm border border-base-300 overflow-hidden rounded-[2rem]">
                    <div className="p-6 border-b border-base-300 flex items-center gap-2 bg-base-300/30">
                        <FaHistory className="text-green-600" />
                        <h3 className="font-black uppercase text-xs tracking-widest">Recent Transactions</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead className="bg-base-300/50">
                                <tr className="text-base-content/70 border-b border-base-300">
                                    <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest">Date & Time</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Student</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Amount</th>
                                    <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-300/30">
                                {transactions.length > 0 ? (
                                    transactions.map((t) => (
                                        <tr key={t._id} className="hover:bg-base-300/20 transition-colors">
                                            <td className="py-5 px-8">
                                                <div className="flex items-center gap-3 font-bold text-sm">
                                                    <FaCalendarAlt className="text-green-600/50" />
                                                    {new Date(t.date).toLocaleDateString('en-GB', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-2 font-medium">
                                                    <div className="avatar placeholder">
                                                        <div className="bg-green-100 text-green-700 rounded-full w-8">
                                                            <span className="text-xs uppercase">{t.studentName?.charAt(0)}</span>
                                                        </div>
                                                    </div>
                                                    {t.studentName}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <span className="font-black text-green-600">${t.amount.toFixed(2)}</span>
                                            </td>
                                            <td className="py-5 px-8 text-right">
                                                <span className="badge badge-success badge-outline border-2 font-black text-[10px] uppercase tracking-widest px-4 py-3">
                                                    {t.status || 'Successful'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center font-medium italic opacity-50">
                                            No transaction records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueHistory;