import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const {user}=useAuth()
  useEffect(() => {
    const fetchTutors = async () => {
      const res = await axios.get("http://localhost:3000/tutor");
      const approvedTutors = res.data.filter(t => t.status === "Approved");
      const sorted = approvedTutors.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTutors(sorted);
    };

    fetchTutors();
  }, []); // [] মানে একবার fetch, interval দরকার নেই

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6">Latest Tutors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {tutors.map((tutor) => (
            <motion.div
              key={tutor._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
            >
              <motion.img
                src={tutor.profileImage|| "/default-avatar.jpg"} 
                alt=''
                className="w-24 h-24 rounded-full mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-xl font-semibold">{tutor.name}</h3>
              <p className="text-gray-500 font">Qualifications:{tutor.qualifications}</p>
              <p className="text-gray-500">Experience:{tutor.experience}</p>
              <p className="text-gray-500">Salary:{tutor.expectedSalary}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LatestTutors;
