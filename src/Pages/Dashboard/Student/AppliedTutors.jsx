import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'
import LoadingSpin from '../../../componet/LoadingSpin'

const AppliedTutors = () => {

  const { user } = useAuth()

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  })

  // Fetch all tutor applications
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['alltutor'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutor')
      return res.data
    }
  })

  const tutors = data || []

  // Approve & Payment
  const handlePayment = async (app) => {
    const res = await axiosSecure.post('/create-checkout-session', {
      tutorId: app._id,
      tuitionId: app.tuitionId,
      name: app.name,
      price: Number(app.expectedSalary),
      student: {
        name: user?.displayName,
        email: user?.email
      }
    })
    window.location.href = res.data.url
  }

  // Reject application
  const handleReject = async (app) => {
    await axiosSecure.patch(`/tutor/${app._id}`, { status: "Rejected" })
    refetch()
  }

  if (isLoading) return <LoadingSpin />

  return (
    <div className="w-full min-h-screen p-10">

      <h2 className="text-3xl font-bold mb-8">Applied Tutors</h2>

      {tutors.length === 0 && <p>No tutor applications yet.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map(app => (
          <div key={app._id} className="border rounded-xl p-6 shadow-lg">

            <div className="flex items-center gap-4 mb-4">
              <img
                src={app.profileImage || "https://i.ibb.co/5GzXkwq/user.png"}
                alt={app.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="text-xl font-bold">{app.name}</h3>
                <p className="text-sm text-slate-500">{app.email}</p>
              </div>
            </div>

            <p><b>Qualifications:</b> {app.qualifications}</p>
            <p><b>Experience:</b> {app.experience} years</p>
            <p className="text-green-600 font-bold">Salary: ${app.expectedSalary}</p>
            <p>Status: <span className="font-semibold">{app.status}</span></p>

            {app.status === "Pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handlePayment(app)}
                  className="flex-1 bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <FaCheckCircle /> Approve & Pay
                </button>

                <button
                  onClick={() => handleReject(app)}
                  className="flex-1 bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <FaTimesCircle /> Reject
                </button>
              </div>
            )}

            {app.status !== "Pending" && (
              <p className="mt-4 font-bold text-center">{app.status}</p>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}

export default AppliedTutors