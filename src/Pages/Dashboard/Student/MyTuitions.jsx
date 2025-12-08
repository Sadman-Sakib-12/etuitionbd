import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const MyTuitions = () => {
    return (
        <div className="w-full min-h-[calc(100vh-40px)] p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-6">My Approved Tuitions</h2>

            {/* {tuitions.length === 0 && (
                <p className="text-gray-500">You have no approved tuitions yet.</p>
            )} */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* {tuitions.map(tuition => ( */}
                    <div
                        // key={tuition._id}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">Subject:</h3>
                            {/* {tuition.subject} */}
                            <p>Class:</p>
                             {/* {tuition.class} */}
                            <p>Location:</p>
                             {/* {tuition.location} */}
                            <p>Budget:</p>
                             {/* ${tuition.budget} */}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                              
                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                            >
                                  {/* onClick={() => handleDelete(tuition._id)} */}
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                {/* // ))} */}
            </div>
        </div>
    )
}

export default MyTuitions