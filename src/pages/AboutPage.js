import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-xl bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-500"> WELCOM TO MY MERN STACK </h1>
        <h4 className="text-3xl font-bold mb-4 text-gray-100 bg-gray-900 p-2"> Ing. Eliace Jean </h4>
        <p className="text-gray-700 text-lg mb-6">
          This project is a full-stack MERN application designed to showcase:
        </p>
        

      <ul className="list-none text-left text-gray-700 mb-8">
  {[
    'Robust JWT authentication implementation for secure sessions and access token management.',
    'Complete password recovery flow using temporary tokens, controlled expiration, and secure email sending via Nodemailer and SMTP.',
    'User profile editing with secure image upload and storage using Multer, including data validation and sanitization.',
    'User deletion capabilities with proper authorization checks to maintain data integrity.',
    'API route protection with custom middleware for JWT-based authorization, managing user access and permissions.',
    'Global frontend state management with Redux Toolkit for efficient sync with backend and handling asynchronous states.',
    'Advanced responsive design using Tailwind CSS utilities for seamless mobile and desktop experiences.',
    'Enhanced security through bcryptjs password hashing, including salting and adaptive salting to prevent brute-force attacks.',
    'Backend built with Node.js and Express for scalable RESTful API development.',
    'Database management with MongoDB Atlas, ensuring high availability and security.',
    'Logout functionality to safely clear user sessions and tokens.',
    'Comprehensive user profile management including view, edit, and avatar upload.',
    ,
  ].map((item, idx) => (
    <li key={idx} className="flex items-start mb-3">
      <span className="text-blue-600 mr-3 mt-1 select-none">►</span>
      <span>{item}</span>
    </li>
  ))}
</ul>

        <p className="text-gray-700">
          Use this app to understand modern web development concepts, including authentication, API integration, and responsive UI design.
        </p>
        <button
          onClick={() => navigate('/landingPage')}
          className="mt-8 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
        >
          Go to Landing Page
        </button>
      </div>
    </div>
  );
}

export default AboutPage;

