import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import EditModal from '../../../componet/Modal/EditModal'
import LoadingSpin from '../../../componet/LoadingSpin'

const MyTuitions = () => {
  const [editingTuition, setEditingTuition] = useState(null)

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  })

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition')
      return res.data
    }
  })

  if (isLoading) return <div>Loading...</div>

  const handleDelete = async (tuition) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will delete your tuition!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete'
    })

    if (result.isConfirmed) {
      await axiosSecure.delete(`/tuition/${tuition._id}`)
      refetch()
      Swal.fire('Deleted!', 'Tuition deleted successfully.', 'success')
    }
  }

  const handleUpdate = async () => {
    await axiosSecure.patch(`/tuition/${editingTuition._id}`, {
      subject: editingTuition.subject,
      class: editingTuition.class,
      location: editingTuition.location,
      budget: editingTuition.budget,
      status: 'Pending' // optional, backend will also force it
    })

    refetch()
    Swal.fire('Updated!', 'Sent for re-approval.', 'success')
    setEditingTuition(null)
  }
  if (isLoading) return <p className="p-6 text-center"><LoadingSpin /></p>

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Tuitions</h2>

      {/* Table */}
      <div className="overflow-x- shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="">
            <tr>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Budget</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No tuitions found
                </td>
              </tr>
            ) : (
              data.map(tuition => (
                <tr key={tuition._id} className="border hover:bg-gray-50">
                  <td className="px-4 py-3">{tuition.subject}</td>
                  <td className="px-4 py-3">{tuition.class}</td>
                  <td className="px-4 py-3">{tuition.location}</td>
                  <td className="px-4 py-3">${tuition.budget}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${tuition.status === 'Approved'
                      ? 'text-green-600'
                      : tuition.status === 'Pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                      }`}
                  >
                    {tuition.status}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {(tuition.status === 'Pending' || tuition.status === 'Rejected') && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setEditingTuition(tuition)}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold
                   rounded-md bg-blue-600 text-white
                   hover:bg-blue-700 transition"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(tuition)}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold
                   rounded-md bg-red-600 text-white
                   hover:bg-red-700 transition"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>


                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingTuition && (
        <EditModal
          editingTuition={editingTuition}
          setEditingTuition={setEditingTuition}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default MyTuitions
