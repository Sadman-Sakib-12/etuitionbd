import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading payments</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
        Payment History
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-indigo-100">
            <tr>
              <th className="text-left py-3 px-4">Tutor ID</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Transaction ID</th>
              <th className="text-left py-3 px-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map(payment => (
              <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{payment.tutorId}</td>
                <td className="py-3 px-4">${payment.amount}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    payment.status === 'Success'
                      ? 'text-green-600'
                      : payment.status === 'Pending'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}
                >
                  {payment.status}
                </td>
                <td className="py-3 px-4">{payment.transactionId}</td>
                <td className="py-3 px-4">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No payment history found
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
