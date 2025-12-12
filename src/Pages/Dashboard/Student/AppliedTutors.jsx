import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaCheck, FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'

const AppliedTutors = () => {
    const { user } = useAuth()
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    })
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['alltutor'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tutor')
            return res.data
        }
    })
    const tutor = data || []
const handlePayment = async (app) => {
  try {
    const res = await axiosSecure.post('/create-checkout-session', {
      tutorId: app._id,
      name: user?.displayName,
      price: Number(app.expectedSalary), 
      student: {
        name: user?.displayName,
        email: user?.email,
      }
    });

    window.location.href = res.data.url;
  } catch (error) {
    console.log("Payment error:", error);
  }
};
    const handleReject = async (app) => {
        try {
            await axiosSecure.patch(`/tutor/${app._id}`, {
                status: 'Rejected'
            });
            refetch(); // refresh data after rejection
        } catch (error) {
            console.error("Failed to reject tutor:", error);
        }
    }
    return (
        <div className="w-full min-h-[calc(100vh-40px)] p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-6">Applied Tutors</h2>

            {/* {applications.length === 0 && (
                <p className="text-gray-500">No tutor applications received yet.</p>
            )} */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutor.map(app => (
                    <div
                        // key={app._id}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={user?.photoURL || '/default-avatar.png'}
                                alt={app.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold">    {app.name}</h3>

                        </div>
                        <p><strong>Qualifications: {app.qualifications}</strong> </p>

                        <p><strong>Experience:</strong> {app.experience} years</p>

                        <p><strong>Expected Salary:${app.expectedSalary}</strong> </p>

                        <p className="mt-2">
                            <strong>Status:{app.status}</strong>
                        </p>


                        {app.status === 'Pending' && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handlePayment(app)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    <FaCheckCircle /> Approve
                                </button>
                                <button
                                onClick={()=>handleReject(app)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                                >
                                    <FaTimesCircle /> Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppliedTutors