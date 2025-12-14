import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-40px)] p-6">
      <h1 className="text-3xl font-bold text-center mb-8">About Our Tuitions</h1>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {/* Tuition Info Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
          <p className="text-gray-700">
            We provide high-quality tuition services for students from primary to higher secondary levels. 
            Our tutors are experienced, verified, and ready to help you excel in your studies.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Subjects Covered</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Mathematics</li>
            <li>Science (Physics, Chemistry, Biology)</li>
            <li>English</li>
            <li>Bangla</li>
            <li>Social Studies</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Flexible Learning</h2>
          <p className="text-gray-700">
            Students can choose online or in-person sessions based on their preference. Our schedules are flexible 
            to ensure learning fits comfortably with other activities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Affordable Tuition</h2>
          <p className="text-gray-700">
            We offer tuitions at competitive prices, with various packages to suit your needs and budget. 
            Quality learning doesn’t have to be expensive.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-700 mb-4">
          Explore our available tuitions and apply today to join a class that matches your needs!
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          View Tuitions
        </button>
      </div>
    </div>
  );
};

export default About;
