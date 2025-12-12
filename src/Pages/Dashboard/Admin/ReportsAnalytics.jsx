import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

  // Prepare data for line chart
  const chartData = {
    labels: transactions.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue Over Time',
        data: transactions.map(t => t.amount),
        fill: false,
        borderColor: '#4ade80', // green
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue Over Time' },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Reports & Analytics</h1>

      {/* Total Revenue */}
      <div className="bg-green-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold">Total Revenue</h2>
        <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
      </div>

      {/* Revenue Line Chart */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Transaction History Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Tuition Title</th>
                <th className="py-2 px-4 border">Student</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{new Date(t.date).toLocaleString()}</td>
                  <td className="py-2 px-4">{t.tuitionTitle || 'N/A'}</td>
                  <td className="py-2 px-4">{t.studentName || t.studentEmail}</td>
                  <td className="py-2 px-4">${t.amount.toFixed(2)}</td>
                  <td className="py-2 px-4 text-green-600 font-semibold">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
