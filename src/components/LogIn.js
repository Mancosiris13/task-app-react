import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
  const API_URL = process.env.REACT_APP_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API_URL}/users/login`, { email, password })
      .then((response) => {
        navigate('/dashboard', { state: response.data }); // replace "/dashboard" with the path to your desired component
      })

      .catch((error) => {
        setErrorMessage('Invalid Username or Password');
      });
  };

  return (
    <div className=" pt-6 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex flex-col items-center justify-center h-screen">
        {/* LOG IN FORM*/}
        <form
          onSubmit={handleSubmit}
          className="bg-green-200 p-6 rounded-lg w-80"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            className="bg-white center hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4 mt-5"
            type="submit"
          >
            Log In
          </button>
          <p className="text-gray-700 text-sm mb-2">
            Don't have an account?{' '}
            <Link to={'/signup'} className="text-green-800 font-semibold ">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
