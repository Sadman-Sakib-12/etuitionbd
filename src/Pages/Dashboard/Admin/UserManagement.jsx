import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const UserManagement = () => {
  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {users.map((user) => ( */}
                {/* <tr key={user._id} className="text-center border-b">
                  <td className="py-2 px-4">
                    <img
                      src={user.image || "/default-profile.png"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td> */}
                  {/* <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">{user.verified ? "Verified" : "Unverified"}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button> */}
                  {/* </td>
                </tr> */}
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>
      )
}

      export default UserManagement