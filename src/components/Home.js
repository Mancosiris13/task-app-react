import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-gray-800 mb-8 tracking-wider">
        APP<span className="text-green-500">TASK</span>
      </h1>
      <div className="flex justify-center">
        <Link to={'/users/login'}>
          <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-full mr-4">
            Log In
          </button>
        </Link>
        <Link to={'/signup'}>
          <button className="bg-white text-gray-800 font-bold py-3 px-6 rounded-full border-2 border-green-500">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
