import React, { useState } from 'react';

const Contact = () => {
  return (
    <div className=" min-h-[calc(100vh-40px)] p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700">
            Have questions or want to apply for tuition? Fill the form or reach out to us directly.
          </p>
          <div>
            <p><strong>Address:</strong> 502 Main Street, kisoreganj, Bangladesh</p>
            <p><strong>Phone:</strong>01792138530</p>
            <p><strong>Email:</strong>sadmansakib8530@gmail.com</p>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-blue-600 hover:underline">Facebook</a>
            <a href="#" className="text-blue-400 hover:underline">Twitter</a>
            <a href="#" className="text-pink-500 hover:underline">Instagram</a>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form className=" p-6 rounded-xl shadow space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded"

            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              
              className="w-full p-2 border rounded"
   
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-2 border rounded h-32"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
