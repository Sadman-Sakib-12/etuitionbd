import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const UserEditModal = ({editingUser, setEditingUser}) => {
      const queryClient = useQueryClient()
  

    // Update user
    const updateUser = useMutation({
        mutationFn: async (updatedUser) => {
            const res = await axiosSecure.patch(`/user/${updatedUser._id}`, updatedUser)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users', user?.email])
            setEditingUser(null)
        },
    })
    return (
        <div>   {editingUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            value={editingUser.phone || ''}
                            onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Phone"
                        />
                        <select
                            value={editingUser.role}
                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                            className="border p-2 rounded"
                        >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                            <option value="admin">Admin</option>
                        </select>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={editingUser.verified || false}
                                onChange={(e) => setEditingUser({ ...editingUser, verified: e.target.checked })}
                            />
                            Verified
                        </label>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => updateUser.mutate(editingUser)}
                                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}</div>
    )
}

export default UserEditModal