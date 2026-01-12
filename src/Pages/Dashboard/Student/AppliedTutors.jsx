import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'
import LoadingSpin from '../../../componet/LoadingSpin'

const AppliedTutors = () => {
    const { user } = useAuth()
    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
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
            const res = await axiosSecure.post('/create-checkout-session', {
                tutorId: app._id,
                tuitionId: app.tuitionId, 
                name: app.name,
                price: Number(app.expectedSalary),
                student: {
                    name: user?.displayName,
                    email: user?.email, 
                }

            });
              console.log(res.data)
            window.location.href = res.data.url;
       
    };


    const handleReject = async (app) => {
        try {
            await axiosSecure.patch(`/tutor/${app._id}`, {
                status: 'Rejected'
            });
            refetch(); 
        } catch (error) {
            console.error("Failed to reject tutor:", error);
            alert("Failed to reject tutor.");
        }
    }

    if (isLoading) return <p className="p-6 text-center"><LoadingSpin/></p>

    return (
        <div className="w-full min-h-[calc(100vh-40px)] p-10 ">
            <h2 className="text-3xl font-bold mb-8 ">Applied Tutors 👨‍🏫</h2>

            {tutor.length === 0 && (
                <p className="text-gray-500 italic">No tutor applications received yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutor.map(app => (
                    <div
                        key={app._id}
                        className=" rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-4 border-indigo-500"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={user?.photoURL || '/default-avatar.png'} 
                                alt={app.name}
                                className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-300"
                            />
                            <div>
                                <h3 className="text-xl font-bold ">{app.name}</h3>
                                <p className="text-sm ">{app.email}</p>
                            </div>
                        </div>

                        <div className="space-y-1 mb-4 ">
                            <p>
                                <strong>Qualifications:</strong> {app.qualifications}
                            </p>
                            <p>
                                <strong>Experience:</strong> {app.experience} years
                            </p>
                            <p className="text-lg font-semibold text-green-700">
                                <strong>Expected Salary:</strong> ${app.expectedSalary}
                            </p>
                            <p className="pt-2">
                                <strong>Status:</strong>
                                <span className={`font-semibold ml-1 ${app.status === 'Pending' ? 'text-yellow-600' : app.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                                    {app.status}
                                </span>
                            </p>
                        </div>

                        {app.status === 'Pending' && (
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => handlePayment(app)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                                >
                                    <FaCheckCircle /> Approve & Pay
                                </button>
                                <button
                                    onClick={() => handleReject(app)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                                >
                                    <FaTimesCircle /> Reject
                                </button>
                            </div>
                        )}
                        {(app.status !== 'Pending') && (
                            <div className="mt-4">
                                <p className={`text-center py-2 rounded-lg font-bold ${app.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {app.status}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppliedTutors