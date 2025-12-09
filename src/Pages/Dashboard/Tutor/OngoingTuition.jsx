import React from 'react'

const OngoingTuition = () => {
  return (
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ongoing Tuitions</h1>

      {/* {tuitions.length === 0 ? ( */}
        {/* <p className="text-gray-600">No ongoing tuitions found.</p> */}
    {/* //   ) : ( */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Tuition Title</th>
                <th className="py-2 px-4 border">Student Name</th>
                <th className="py-2 px-4 border">Subject</th>
                <th className="py-2 px-4 border">Schedule</th>
                <th className="py-2 px-4 border">Salary</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            {/* <tbody>
              {tuitions.map((t) => (
                <tr key={t._id} className="text-center border-b hover:bg-gray-50">
                  <td className="py-2 px-4 font-semibold">{t.title}</td>
                  <td className="py-2 px-4">{t.studentName}</td>
                  <td className="py-2 px-4">{t.subject}</td>
                  <td className="py-2 px-4">{t.schedule}</td>
                  <td className="py-2 px-4">${t.salary}</td>
                  <td className="py-2 px-4 text-green-600 font-semibold">{t.status}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
    {/* //   )} */}
    </div>
  )
}

export default OngoingTuition