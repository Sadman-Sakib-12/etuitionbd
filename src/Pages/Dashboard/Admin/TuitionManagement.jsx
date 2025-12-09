
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const TuitionManagement = () => {
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    })
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['allTuitions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tuition')
            return res.data
        }
    })
    const tuitions = data || []
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/tuition/${id}`, { status })
            return res.data
        },
        onSuccess: () => {
            refetch()
        },
        onError: (err) => console.log(err)
    })
    return (
        <div className="p-6 min-h-[calc(100vh-40px)] bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Tuition Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tuitions.map((t) => (
                    <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2">Subject{t.subject}</h3>

                            <p><strong>Class: {t.class}</strong> </p>

                            <p><strong>Location:{t.location}</strong></p>

                            <p><strong>Budget: ${t.budget}</strong></p>

                            <p><strong>Status:</strong> <span className={`font-semibold ${t.status === 'Approved' ? 'text-green-600' : t.status === 'Rejected' ? 'text-red-600' : 'text-gray-600'}`}>{t.status}</span></p>
                        </div>

                        {/* Approve / Reject Buttons */}
                        {t.status === 'Pending' && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => updateStatus({ id: t._id, status: 'Approved' })}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    <FaCheckCircle /> Approve
                                </button>
                                <button
                                    onClick={() => updateStatus({ id: t._id, status: 'Rejected' })}
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

export default TuitionManagement