import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const ViewProfile = () => {
        const { user } = useAuth()
  const { id } = useParams();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (!tutor) return <p>No tutor found</p>;

  return (
     <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
        Tutor Profile
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user?.photoURL}
          alt=''
          className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{tutor.name}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Qualifications:</strong> {tutor.qualifications}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Experience:</strong> {tutor.experience} years
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Expected Salary:</strong> ${tutor.expectedSalary}
          </p>
        </div>
      </div>

    </div>
  );
};

export default ViewProfile;
