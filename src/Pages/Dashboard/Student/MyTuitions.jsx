import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import EditModal from '../../../componet/Modal/EditModal'

const MyTuitions = () => {
  const [editingTuition, setEditingTuition] = useState(null)
  const [activeTab, setActiveTab] = useState()
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition')
      return res.data
    }
  })

  const tuitions = data || []

  const filteredTuitions = tuitions.filter(t => t.status === activeTab)

  if (isLoading) return <div>Loading...</div>

  const handleDelete = async (tuition) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will delete your application!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/tuition/${tuition._id}`);
        refetch();
        Swal.fire('Deleted!', 'Application has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete application.', 'error');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.patch(`/tuition/${editingTuition._id}`, {
        subject: editingTuition.subject,
        class: editingTuition.class,
        location: editingTuition.location,
        budget: editingTuition.budget,
        status: "Pending" // update automatically pending
      })
      refetch()
      Swal.fire('Submitted!', 'Tuition update sent for approval.', 'success')
      setEditingTuition(null)
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Failed to update tuition.', 'error')
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-40px)] p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">My Tuitions</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['Approved', 'Pending', 'Rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tuition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTuitions.map(tuition => (
          <div key={tuition._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">Subject: {tuition.subject}</h3>
              <p>Class: {tuition.class}</p>
              <p>Location: {tuition.location}</p>
              <p>Budget: ${tuition.budget}</p>
              <p className={`mt-2 font-semibold ${tuition.status === 'Approved'
                ? 'text-green-600'
                : tuition.status === 'Pending'
                  ? 'text-yellow-600'
                  : 'text-red-600'
                }`}>
                Status: {tuition.status}
              </p>
            </div>

            {(tuition.status === 'Pending' || tuition.status === 'Rejected') && (
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setEditingTuition(tuition)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(tuition)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
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
