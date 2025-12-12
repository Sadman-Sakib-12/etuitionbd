import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const OngoingTuition = () => {
    const { user } = useAuth();
    const axiosSecure = axios.create({ baseURL: 'http://localhost:3000', withCredentials: true });
console.log('Logged in user:', user);
 const { data, isLoading } = useQuery({
  queryKey: ['ongoingTuitions', user?.tutorId], // MongoDB tutorId
  queryFn: async () => {
    if (!user?.tutorId) return [];
    const res = await axiosSecure.get(
      `/tuitions/tutor/approved/${user.tutorId}`
    );
    return res.data;
  },
  enabled: !!user?.tutorId,
});

    console.log(data)

    if (isLoading) return <div>Loading...</div>;

    const tuitions = data || []; // fallback

    return (
        <div>
            <h1>Ongoing Tuitions</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tuition Title</th>
                        <th>Student</th>
                        <th>Experience</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tuitions.map(t => (
                        <tr key={t._id}>
                            <td>{t.subject}</td>
                            <td>{user?.email}</td>
                            <td>{t.tutorExperience} yrs</td>
                            <td>${t.amount}</td>
                            <td>{t.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default OngoingTuition