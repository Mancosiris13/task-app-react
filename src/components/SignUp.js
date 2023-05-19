import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const API_URL = process.env.REACT_APP_URL;
  console.log(API_URL);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make API call to sign up user with name, email, password, and age
    // Redirect to dashboard page upon successful sign up
    axios
      .post(`${API_URL}/users/`, { name, email, password, age })
      .then((response) => {
        // console.log('this is the response', response);
        navigate('/dashboard', { state: response.data });
      })
      .catch((error) => {
        if (
          error.response.data.errors &&
          error.response.data.errors.age !== undefined
        ) {
          setErrorMessage(error.response.data.errors.age.message);
          console.log(error.response.data.errors.age.message);
        } else if (
          error.response.data.errors &&
          error.response.data.errors.password !== undefined
        ) {
          setErrorMessage(error.response.data.errors.password.message);
          console.log(error.response.data.errors.password.message);
        } else if (
          error.response.data.errors &&
          error.response.data.errors.email !== undefined
        ) {
          setErrorMessage(error.response.data.errors.email.message);
          console.log(error.response.data.errors.email.message);
        } else {
          setErrorMessage(error.response.data);
          console.log(error.response.data);
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* SIGN UP FORM*/}
      <form
        onSubmit={handleSubmit}
        className="bg-green-200 p-6 rounded-lg mx-auto max-w-md w-96"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
            Age:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full mb-3"
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-gray-700 text-sm mb-2">
          Already have an account?{' '}
          <Link to={'/users/login'} className="text-green-800 font-semibold ">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
