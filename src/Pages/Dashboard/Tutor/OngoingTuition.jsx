import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaClock, FaUserGraduate, FaMoneyBillWave } from 'react-icons/fa'
import LoadingSpin from '../../../componet/LoadingSpin'

const OngoingTuition = () => {
    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true
    })

    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ['ongoingTutor'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tutor')
            return res.data
        }
    })

    if (isLoading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <LoadingSpin />
        </div>
    )

    return (
        <div className="p-4 md:p-15 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500 rounded-lg text-white shadow-lg shadow-orange-200">
                            <FaClock size={20} />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight ">
                            Ongoing <span className="text-orange-500">Tuitions</span>
                        </h1>
                    </div>
                    <p className=" text-sm font-medium italic">
                        View and manage your active tutoring engagements.
                    </p>
                </div>

               
                <div className="rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="">
                                    <th className="py-5 px-8 text-[10px] font-black uppercase tracking-[0.2em]">Tuition Info</th>
                                    <th className="py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em]">Posted By</th>
                                    <th className="py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Experience</th>
                                    <th className="py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Salary</th>
                                    <th className="py-5 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {tutors.length > 0 ? (
                                    tutors.map((app) => (
                                        <tr key={app._id} className="transition-all group">
                                            <td className="py-5 px-8">
                                                <div className="flex flex-col">
                                                    <span className="font-black  group-hover:text-orange-600 transition-colors">
                                                        {app.name}
                                                    </span>
                                                    <span className="text-[10px]  font-bold uppercase tracking-wider mt-0.5">
                                                        Ref: #{app._id.slice(-6)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-2  font-bold text-sm">
                                                    <FaUserGraduate className="" />
                                                    {app.qualifications}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <span className="px-3 py-1  rounded-lg text-xs font-black">
                                                    {app.experience} Yrs
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <div className="flex items-center justify-center gap-1.5  font-black">      
                                                    ${app.expectedSalary}
                                                </div>
                                            </td>
                                            <td className="py-5 px-8 text-center">
                                                <div className="flex items-center justify-center">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                                                        app.status === "Approved"
                                                            ? "bg-green-100 text-green-600 border-green-200"
                                                            : app.status === "Pending"
                                                                ? "bg-orange-50 text-orange-600 border-orange-100"
                                                                : "bg-red-50 text-red-600 border-red-100"
                                                    }`}>
                                                        {app.status}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-32 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                                                    <FaClock size={32} />
                                                </div>
                                                <p className="text-slate-400 font-bold italic">No ongoing tuitions found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OngoingTuition;