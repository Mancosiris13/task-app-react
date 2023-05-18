import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const DeletedAccount = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/');
  }, 3000);
  return (
    <div className="flex flex-col  h-screen">
      <Link to={'/'}>
        <h1 className="text-5xl font-bold text-gray-800 mb-8 tracking-wider ml-4 mt-4">
          APP<span className="text-green-500">TASK</span>
        </h1>
      </Link>

      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center">
              You have successfully deleted your account.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletedAccount;
