import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

const MyApplications = () => {
    const [activeTab, setActiveTab] = useState()
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    })

    const { data, isLoading,refetch } = useQuery({
        queryKey: ['alltutor'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tutor')
            return res.data
        }
    })
    const handleDelete = async (app) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This will delete your application!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/tutor/${app._id}`)
                refetch()
                Swal.fire('Deleted!', 'Application has been deleted.', 'success')
            } catch (err) {
                console.error(err)
                Swal.fire('Error', 'Failed to delete application.', 'error')
            }
        }
    }

    const tutor = data || []
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
                                <th className="py-2 px-4 border">Actions</th>
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

                                    <td className="py-2 px-4 flex justify-center gap-2">
                                        {(app.status === "Pending" || app.status === "Rejected") && (
                                            <div className="flex justify-end gap-3 mt-4">
                                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                                    <FaEdit /> Edit
                                                </button>
                                                <button onClick={()=>handleDelete(app)} className="flex items-center gap-1 text-red-600 hover:text-red-800">
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        )}
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