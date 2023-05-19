import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from 'react-router-dom';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import Settings from './components/Settings';
import DeletedAccount from './components/DeletedAccount';
import { useState } from 'react';
// require('dotenv').config();
// const apiUrl = process.env.URL;
// console.log(apiUrl);
// import express from 'express'

// require('dotenv').config();
// console.log(process.env);

// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/deletedAccount" element={<DeletedAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
