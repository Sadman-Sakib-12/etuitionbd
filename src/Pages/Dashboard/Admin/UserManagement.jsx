import React, { useState } from 'react'

import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa'
import UserEditModal from '../../../componet/Modal/UserEditModal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

const UserManagement = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState(null)

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await axiosSecure('/users')
      return res.data
    },
  })
const handleDelete = async (user) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `This will delete ${user.name}!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      await axiosSecure.delete(`/user/${user._id}`);
      queryClient.invalidateQueries(['users', user?.email]); 
      Swal.fire('Deleted!', `${user.name} has been deleted.`, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to delete user.', 'error');
    }
  }
};


  // Delete user


  if (isLoading) return <div className="text-center py-10">Loading users...</div>

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">Verified</th>
              <th className="py-3 px-4 border text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  <img
                    src={u.image || '/default-profile.png'}
                    alt={u.name}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.phone || '-'}</td>
                <td className="py-2 px-4">{u.role}</td>
                <td className="py-2 px-4">
                  {u.verified ? <FaCheckCircle className="text-green-500 mx-auto" /> : <FaTimesCircle className="text-red-500 mx-auto" />}
                </td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => setEditingUser(u)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserEditModal editingUser={editingUser} setEditingUser={setEditingUser} />

    </div>
  )
}

export default UserManagement
