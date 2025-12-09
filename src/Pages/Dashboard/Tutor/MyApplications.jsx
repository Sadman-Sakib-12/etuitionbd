import React from 'react'

const MyApplications = () => {
    return (
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
                    {/* <tbody>
                        {applications.map((app) => (
                            <tr key={app._id} className="text-center border-b">
                                <td className="py-2 px-4">{app.tuitionTitle}</td>
                                <td className="py-2 px-4">{app.postedBy}</td>
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
                                    <button
                                        onClick={() => handleEdit(app)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(app._id, app.status)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </div>

            {/* Edit Modal */}
            {/* {editingApp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Application</h2>
                        <label className="block mb-2">
                            Experience (yrs):
                            <input
                                type="number"
                                value={editingApp.experience}
                                onChange={(e) =>
                                    setEditingApp({ ...editingApp, experience: e.target.value })
                                }
                                className="w-full border px-2 py-1 rounded mt-1"
                            />
                        </label>
                        <label className="block mb-4">
                            Expected Salary ($):
                            <input
                                type="number"
                                value={editingApp.expectedSalary}
                                onChange={(e) =>
                                    setEditingApp({ ...editingApp, expectedSalary: e.target.value })
                                }
                                className="w-full border px-2 py-1 rounded mt-1"
                            />
                        </label>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditingApp(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default MyApplications