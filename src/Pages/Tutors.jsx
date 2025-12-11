import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Tutors = () => {
    const navigate = useNavigate();
  // const [selectedTuition, setselectedTuition] = useState(null)
      const { user } = useAuth()
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  })
  const { data, isLoading, error } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutor')
      return res.data
    }
  })
  const tuitor = data || []
  const approvedTuitor = tuitor.filter(t => t.status === 'Approved')
  return (
  <div className="max-w-6xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Our Tutors</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {approvedTuitor.map((tutor) => (
                    <div key={tutor._id} className='bg-white p-6 shadow-lg rounded-lg flex flex-col items-center transition hover:shadow-xl'>
                        <img 
                            src={user?.photoURL} 
                            alt='' 
                            className='w-28 h-28 rounded-full object-cover mb-4 border-2 border-indigo-500'
                        />
                        <h3 className='font-bold text-xl mb-2 text-gray-800'>{tutor.name}</h3>
                        <p className='text-gray-600 mb-1'><strong>Qualifications:</strong> {tutor.qualifications}</p>
                        <p className='text-gray-600 mb-1'><strong>Experience:</strong> {tutor.experience} years</p>
                        <p className='text-gray-600 mb-3'><strong>Expected Salary:</strong> ${tutor.expectedSalary}</p>
                        <button 
                            onClick={() => navigate(`/tutor/${tutor._id}`)} 
                            className='bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition'
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Tutors