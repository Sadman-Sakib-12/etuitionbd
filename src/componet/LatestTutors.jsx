import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("http://localhost:3000/tutor"); // Your backend endpoint
        // Sort by latest (assuming _id has creation order)
        const sortedTutors = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTutors(sortedTutors);
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Loading latest tutors...</p>;

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6">Latest Tutors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tutors.map((tutor, index) => (
          <motion.div
            key={tutor._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
          >
            <motion.img
              src={tutor.profileImage || "/default-avatar.png"}
              alt={tutor.name}
              className="w-24 h-24 rounded-full mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className="text-xl font-semibold">{tutor.name}</h3>
            <p className="text-gray-500">{tutor.subject || "N/A"}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestTutors;
