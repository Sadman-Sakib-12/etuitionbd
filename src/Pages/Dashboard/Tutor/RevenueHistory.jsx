import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartLine, FaHistory, FaCalendarAlt, FaUser, FaDollarSign } from 'react-icons/fa';

const RevenueHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/payment`);
                setTransactions(res.data);
                const total = res.data.reduce((sum, t) => sum + t.amount, 0);
                setTotalRevenue(total);
            } catch (error) {
                console.error("Error fetching payments", error);
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="p-4 md:p-10  min-h-screen">
            <div className="max-w-7xl mx-auto">
                
      
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                <FaChartLine size={24} />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight ">
                                Revenue <span className="text-orange-500">History</span>
                            </h1>
                        </div>
                        <p className="text-slate-500 font-medium">Detailed overview of your earnings and payments</p>
                    </div>
                </div>


                <div className="relative overflow-hidden  rounded-[2rem] p-8 mb-10 shadow-2xl  group">
                    <div className="relative z-10">
                        <h2 className="text-slate-400 text-sm font-black uppercase tracking-[0.3em] mb-2">Total Earnings</h2>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">${totalRevenue.toLocaleString()}</span>
                            <span className="text-orange-500 font-bold">USD</span>
                        </div>
                    </div>
            
                    <FaDollarSign size={120} className="absolute -right-4 -bottom-4  rotate-12 group-hover:scale-110 transition-transform duration-500" />
                </div>

              
                <div className=" rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center gap-2">
                        <FaHistory className="text-orange-500" />
                        <h3 className="font-black uppercase text-xs tracking-widest">Recent Transactions</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="">
                                    <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest">Date & Time</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Student</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Amount</th>
                                    <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {transactions.length > 0 ? (
                                    transactions.map((t) => (
                                        <tr key={t._id} className=" transition-colors group">
                                            <td className="py-5 px-8">
                                                <div className="flex items-center gap-3">
                                                    <FaCalendarAlt className="" />
                                                    <span className="text-sm font-bold ">
                                                        {new Date(t.date).toLocaleDateString('en-GB', {
                                                            day: '2-digit', month: 'short', year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 ounded-lg font-bold text-xs">
                                                    <FaUser size={10} className="text-slate-400" />
                                                    {t.studentName}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <span className="font-black ">${t.amount.toFixed(2)}</span>
                                            </td>
                                            <td className="py-5 px-8 text-center">
                                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-600 border border-green-200 shadow-sm">
                                                    {t.status || 'Successful'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center  font-medium italic">
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