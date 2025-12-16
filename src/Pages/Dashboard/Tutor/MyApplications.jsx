import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import MyApplicationModal from '../../../componet/Modal/MyApplicationModal'

const MyApplications = () => {
  const [editingTuition, setEditingTuition] = useState(null)

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  })

  const { data = [], refetch } = useQuery({
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
      await axiosSecure.delete(`/tutor/${app._id}`)
      refetch()
      Swal.fire('Deleted!', 'Application has been deleted.', 'success')
    }
  }

  const handleUpdate = async () => {
    await axiosSecure.patch(`/tutor/${editingTuition._id}`, {
      qualifications: editingTuition.qualifications,
      experience: editingTuition.experience,
      expectedSalary: editingTuition.expectedSalary,
      status: 'Pending'
    })

    refetch()
    Swal.fire('Updated!', 'Application updated successfully.', 'success')
    setEditingTuition(null)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Tuition Title</th>
              <th className="py-2 px-4 border">Qualifications</th>
              <th className="py-2 px-4 border">Experience</th>
              <th className="py-2 px-4 border">Expected Salary</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((app) => (
              <tr key={app._id} className="text-center border-b">
                <td className="py-2 px-4">{app.name}</td>
                <td className="py-2 px-4">{app.qualifications}</td>
                <td className="py-2 px-4">{app.experience} yrs</td>
                <td className="py-2 px-4">${app.expectedSalary}</td>

                <td className={`py-2 px-4 font-semibold ${
                  app.status === 'Approved'
                    ? 'text-green-600'
                    : app.status === 'Pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  {app.status}
                </td>

                <td className="py-2 px-4">
  {(app.status === 'Pending' || app.status === 'Rejected') && (
    <div className="flex justify-center gap-3">
      <button
        onClick={() => setEditingTuition(app)}
        className="text-blue-600"
      >
        <FaEdit />
      </button>

      <button
        onClick={() => handleDelete(app)}
        className="text-red-600"
      >
        <FaTrash />
      </button>
    </div>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MODAL MUST BE OUTSIDE TABLE */}
      {editingTuition && (
        <MyApplicationModal
          editingTuition={editingTuition}
          setEditingTuition={setEditingTuition}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default MyApplications
