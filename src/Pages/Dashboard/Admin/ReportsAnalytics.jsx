import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Users, Activity, FileText } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AdminReports = () => {
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
        console.error("Failed to fetch payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const chartData = {
    labels: transactions.map(t => new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Revenue ($)',
      data: transactions.map(t => t.amount),
      fill: true,
      backgroundColor: 'rgba(79, 70, 229, 0.08)',
      borderColor: '#4f46e5',
      borderWidth: 2,
      pointRadius: 3,
      tension: 0.4,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { display: false }, x: { grid: { display: false } } }
  };

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* Header Section - Margin reduced */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight ">Reports & Analytics</h2>
          <p className="text-sm font-medium  flex items-center gap-2 mt-1">
            <Activity size={14} className="text-indigo-500" /> Live financial overview
          </p>
        </div>
      </div>

      {/* Stats Overview - Gap and Padding reduced */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', val: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Growth Rate', val: '+12.5%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Sales', val: transactions.length, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((item, i) => (
          <div key={i} className=" p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`h-10 w-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black  uppercase tracking-widest leading-none mb-1">{item.label}</p>
              <h3 className="text-xl font-black ">{item.val}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid - Chart and Table tighter */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-3  p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black ">Revenue Flow</h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">30 Days</span>
          </div>
          <div className="h-[240px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Transaction Table - Simplified and Compact */}
        <div className="lg:col-span-2  rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-50 flex items-center gap-2">
            <FileText className="" size={16} />
            <h3 className="text-sm font-black ">Recent Activity</h3>
          </div>
          <div className="overflow-y-auto max-h-[260px] no-scrollbar">
            <table className="w-full text-left">
              <tbody className="divide-y ">
                {transactions.map((t) => (
                  <tr key={t._id} className=" transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-xs font-black">{t.studentName || 'User'}</p>
                      <p className="text-[9px] font-medium">{new Date(t.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-xs font-black ">${t.amount}</p>
                      <span className="text-[8px] font-black uppercase text-emerald-500">Paid</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;