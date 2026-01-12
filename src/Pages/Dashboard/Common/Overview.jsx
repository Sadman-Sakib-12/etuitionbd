import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, DollarSign, Briefcase, CreditCard } from 'lucide-react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/Overview`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStats(res.data);
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Loading Stats...</div>;

  const statCards = [
    { title: 'Total Users', value: stats?.users, icon: <Users />, color: 'bg-blue-500' },
    { title: 'Tuition Posts', value: stats?.tuition, icon: <BookOpen />, color: 'bg-emerald-500' },
    { title: 'Total Tutors', value: stats?.tutors, icon: <Briefcase />, color: 'bg-amber-500' },
    { title: 'Total Payments', value: stats?.payments, icon: <CreditCard />, color: 'bg-purple-500' },
    { title: 'Revenue', value: stats?.userRole === 'admin' ? `$${stats?.revenue}` : '🔒', icon: <DollarSign />, color: 'bg-rose-500' },
  ];

  return (
    <div className="p-16 space-y-8  min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black ">Platform Overview</h2>
        <span className="px-4 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest">
          Logged in as: {stats?.userRole}
        </span>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className=" p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className={`${card.color} p-3 rounded-full text-white mb-3 shadow-md`}>{card.icon}</div>
            <p className="text-[10px]  font-bold uppercase tracking-tighter">{card.title}</p>
            <h3 className="text-xl font-black ">{card.value || 0}</h3>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className=" p-6 rounded-3xl border border-slate-100 shadow-sm" style={{ minHeight: '350px' }}>
          <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">Revenue History (Recent)</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={stats?.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{fontSize: 11}} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip />
                <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className=" p-6 rounded-3xl border border-slate-100 shadow-sm" style={{ minHeight: '350px' }}>
          <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">Growth Flow</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={stats?.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{fontSize: 11}} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;