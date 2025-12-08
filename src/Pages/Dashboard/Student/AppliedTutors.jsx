import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

const AppliedTutors = () => {
    return (
        <div className="w-full min-h-[calc(100vh-40px)] p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-6">Applied Tutors</h2>

            {/* {applications.length === 0 && (
                <p className="text-gray-500">No tutor applications received yet.</p>
            )} */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* {applications.map(app => ( */}
                    <div
                        // key={app._id}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                // src={app.tutor.photoURL || '/default-avatar.png'}
                                // alt={app.tutor.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold"></h3>
                            {/* {app.tutor.name} */}
                        </div>
                        <p><strong>Qualifications:</strong> </p>
                        {/* {app.tutor.qualifications} */}
                        <p><strong>Experience:</strong>  years</p>
                        {/* {app.tutor.experience} */}
                        <p><strong>Expected Salary:</strong> </p>
                        {/* ${app.tutor.expectedSalary} */}
                        <p className="mt-2">
                            <strong>Status:</strong> 
                        </p>
                        {/* {app.status} */}

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                // onClick={() => handleApprove(app._id)}
                                // disabled={app.status !== 'Pending'}
                                // className={`flex items-center gap-1 px-3 py-1 rounded ${app.status === 'Pending'
                                //         ? 'bg-green-500 text-white hover:bg-green-600'
                                //         : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                //     }`}
                            >
                                <FaCheck /> Approve
                            </button>

                            <button
                                // onClick={() => handleReject(app._id)}
                                // disabled={app.status !== 'Pending'}
                                // className={`flex items-center gap-1 px-3 py-1 rounded ${app.status === 'Pending'
                                //         ? 'bg-red-500 text-white hover:bg-red-600'
                                //         : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                //     }`}
                            >
                                <FaTimes /> Reject
                            </button>
                        </div>
                    </div>
                {/* ))} */}
            </div>
        </div>
    )
}

export default AppliedTutors