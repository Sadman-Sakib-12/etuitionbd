import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { FaEdit, FaTrash, FaClipboardList } from 'react-icons/fa'
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
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316', 
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/tutor/${app._id}`)
        refetch()
        Swal.fire('Deleted!', 'Your application has been removed.', 'success')
      } catch (err) {
        Swal.fire('Error', 'Something went wrong', 'error')
      }
    }
  }

  const handleUpdate = async () => {
    try {
      await axiosSecure.patch(`/tutor/${editingTuition._id}`, {
        qualifications: editingTuition.qualifications,
        experience: editingTuition.experience,
        expectedSalary: editingTuition.expectedSalary,
        status: 'Pending'
      })
      refetch()
      Swal.fire('Updated!', 'Application updated successfully.', 'success')
      setEditingTuition(null)
    } catch (err) {
      Swal.fire('Error', 'Update failed', 'error')
    }
  }

  return (
    <div className="p-4 md:p-10 min-h-screen">
   
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <FaClipboardList size={24} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800">
                My <span className="text-orange-500">Applications</span>
            </h1>
        </div>
        <p className="text-slate-500 font-medium">Manage and track your applied tutoring positions</p>
      </div>

    
      <div className="max-w-7xl mx-auto">
        <div className=" rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="">
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider">Tuition Title</th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider">Qualifications</th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider text-center">Experience</th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider text-center">Salary</th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider text-center">Status</th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.length > 0 ? (
                  data.map((app) => (
                    <tr key={app._id} className=" transition-colors group">
                      <td className="py-4 px-6">
                        <span className="font-bold  group-hover:text-orange-600 transition-colors">
                            {app.name}
                        </span>
                      </td>
                      <td className="py-4 px-6  font-medium">{app.qualifications}</td>
                      <td className="py-4 px-6 text-center ">
                        <span className="px-3 py-1  rounded-full text-xs font-bold">
                            {app.experience} yrs
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-black ">${app.expectedSalary}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                          app.status === 'Approved'
                            ? 'bg-green-100 text-green-600'
                            : app.status === 'Pending'
                            ? 'bg-orange-100 text-orange-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center gap-2">
                          {(app.status === 'Pending' || app.status === 'Rejected') ? (
                            <>
                              <button
                                onClick={() => setEditingTuition(app)}
                                className="p-2 hover:bg-blue-50 text-blue-500 rounded-xl transition-all hover:scale-110"
                                title="Edit Application"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(app)}
                                className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-all hover:scale-110"
                                title="Delete Application"
                              >
                                <FaTrash size={18} />
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium italic">No actions available</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-slate-400 font-bold">No applications found.</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

 
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