import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RevenueHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/payment`);
                setTransactions(res.data);

                // Calculate total revenue
                const total = res.data.reduce((sum, t) => sum + t.amount, 0);
                setTotalRevenue(total);
            } catch (error) {
                console.error("Failed to fetch payments:", error);
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Revenue History</h1>

            {/* Total Revenue */}
            <div className="bg-green-100 p-4 rounded mb-6">
                <h2 className="text-lg font-semibold">Total Revenue</h2>
                <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
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
                            {transactions.map((t) => (
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

export default RevenueHistory;
