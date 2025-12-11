import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
  const { user } = useAuth();

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/payment'); // backend এ GET /payment route থাকতে হবে
      return res.data;
    },
    enabled: !!user?.email
  });

  const payments = data ? data.filter(p => p.studentEmail === user?.email) : [];



  return (
   <div className="max-w-6xl mx-auto mt-10 px-4">
  <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">Payment History</h1>

 
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-indigo-100">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-sm">Tutor ID</th>
            <th className="text-left py-3 px-4  font-semibold text-sm">Amount</th>
            <th className="text-left py-3 px-4  font-semibold text-sm">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Transaction ID</th>
            <th className="text-left py-3 px-4  font-semibold text-sm">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{payment.tutorId}</td>
              <td className="py-3 px-4">${payment.amount}</td>
              <td className={`py-3 px-4 font-semibold ${
                payment.status === 'Success' ? 'text-green-600' :
                payment.status === 'Pending' ? 'text-yellow-500' :
                payment.status === 'Failed' ? 'text-red-500' : 'text-gray-600'
              }`}>{payment.status}</td>
              <td className="py-3 px-4">{payment.transactionId}</td>
              <td className="py-3 px-4">{new Date(payment.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>

  );
};

export default PaymentHistory;
