import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import EditModal from '../../../componet/Modal/EditModal'
import MyApplicationModal from '../../../componet/Modal/MyApplicationModal'
import LoadingSpin from '../../../componet/LoadingSpin'

const MyApplications = () => {
    const [editingTuition, setEditingTuition] = useState(null)
    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true
    })

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['alltutor'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tutor')
            return res.data
        }
    })


    const tutor = data || []
      if (isLoading) return <p className="p-6 text-center"><LoadingSpin/></p>
    return (
        <div className="p-6">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">My Applications</h1>

                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border">Tuition Title</th>
                                <th className="py-2 px-4 border">Posted By</th>
                                <th className="py-2 px-4 border">Experience</th>
                                <th className="py-2 px-4 border">Expected Salary</th>
                                <th className="py-2 px-4 border">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {tutor.map((app) => (
                                <tr key={app._id} className="text-center border-b">
                                    <td className="py-2 px-4">{app.name}</td>
                                    <td className="py-2 px-4">{app.qualifications}</td>
                                    <td className="py-2 px-4">{app.experience} yrs</td>
                                    <td className="py-2 px-4">${app.expectedSalary}</td>

                                    <td
                                        className={`py-2 px-4 font-semibold ${app.status === "Approved"
                                            ? "text-green-600"
                                            : app.status === "Pending"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {app.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default MyApplications