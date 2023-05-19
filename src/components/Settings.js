import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
  const API_URL = process.env.REACT_APP_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const response = location.state;

  //location.state get what we have passed to this-
  //component when we call it on the previus component using navigate()//
  const headers = response
    ? {
        Authorization: `Bearer ${response.token}`,
      }
    : {};
  const [dangerZoneActivated, setDangerZoneActivated] = useState(false);
  const [deleteAccountConfirmation, setDeleteAccountConfirmation] =
    useState('');
  const [name, setName] = useState();
  const [updateNameSucces, setUpdateNameSucces] = useState(false);
  const [email, setEmail] = useState();
  const [updateEmailSucces, setUpdateEmailSucces] = useState(false);
  const [password, setPassword] = useState(undefined);
  const [repeatPassword, setRepeatPassword] = useState(undefined);
  const [passwordsMatchFail, setPasswordsMatchFail] = useState(false);
  const [updatePasswordSucces, setUpdatePasswordSucces] = useState(false);

  const [age, setAge] = useState();

  useEffect(() => {
    if (!response || !response.user) {
      navigate('/');
    }
  }, [navigate, response]);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/me`, { headers })
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleLogOut = () => {
    axios
      .post(`${API_URL}/users/logout`, {}, { headers })
      .then(() => {
        navigate('/logout');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogOutAll = () => {
    axios
      .post(`${API_URL}/users/logoutAll`, {}, { headers })
      .then(() => {
        navigate('/logout');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleShowWarningMessage = () => {
    setDangerZoneActivated(!dangerZoneActivated);
  };

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    if (deleteAccountConfirmation === 'delete my account') {
      axios
        .delete(`${API_URL}/users/me`, { headers })
        .then((response) => {
          navigate('/deletedAccount');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleReturn = () => {
    navigate('/dashboard', { state: response });
  };

  const handleUpdateName = (event) => {
    event.preventDefault();
    axios
      .patch(`${API_URL}/users/me`, { name }, { headers })
      .then((response) => {
        setUpdateNameSucces(true);
        setTimeout(() => {
          setUpdateNameSucces(false);
        }, 2500);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUpdateEmail = (event) => {
    event.preventDefault();
    axios
      .patch(`${API_URL}/users/me`, { email }, { headers })
      .then((response) => {
        setUpdateEmailSucces(true);
        setTimeout(() => {
          setUpdateEmailSucces(false);
        }, 2500);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    if (password === repeatPassword) {
      axios
        .patch(`${API_URL}/users/me`, { password }, { headers })
        .then((response) => {
          setPasswordsMatchFail(false);
          setUpdatePasswordSucces(true);
          setTimeout(() => {
            setUpdatePasswordSucces(false);
          }, 3000);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (password !== repeatPassword) {
      setPasswordsMatchFail(true);
      setTimeout(() => {
        setPasswordsMatchFail(false);
      }, 2500);
    }
  };
  return (
    <>
      <div className="  min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wider mb-6">
          TASK
          <span className="text-green-200 md:text-green-300 lg:text-green-400">
            APP
          </span>
        </h1>
        {/* RETURN AND CLOSE SESSIONS BUTTONS*/}
        {/* RETURN AND CLOSE SESSIONS BUTTONS*/}
        {/* RETURN AND CLOSE SESSIONS BUTTONS*/}
        <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-white rounded-lg shadow-lg py-8 px-10 space-y-8 inline-block">
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <button
              onClick={handleReturn}
              className="bg-green-500 text-white font-bold py-3 px-6 rounded-full mb-4 md:mb-0 md:mr-4"
            >
              Return
            </button>
            <div className="flex flex-col md:flex-row">
              <button
                className="bg-red-500 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full mb-4 md:mb-0 md:mr-4"
                onClick={handleLogOut}
              >
                Log Out
              </button>
              <button
                className="bg-red-500 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full"
                onClick={handleLogOutAll}
              >
                Close All Sessions
              </button>
            </div>
          </div>
          {/* UPDATE PROFILE SECTION*/}
          {/* UPDATE PROFILE SECTION*/}
          {/* UPDATE PROFILE SECTION*/}
          <div className="bg-gray-100 px-4 py-8 sm:px-6 md:py-12 lg:px-8 bg-gradient-to-r from-blue-300 to-green-300 rounded-lg   ">
            <h1 className="text-3xl font-bold mb-8">Update Profile</h1>
            {/* UPDATE NAME FORM*/}
            {/* UPDATE NAME FORM*/}
            {/* UPDATE NAME FORM*/}
            <div className="mb-12">
              <form onSubmit={handleUpdateName} className="text-center">
                <label
                  htmlFor="text"
                  className="inline-block font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  className="mb-4 mt-1 inline-block w-full rounded-md border-green-300 focus:border-green-500 focus:ring-green-500"
                  defaultValue={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <div className="w-60">
                  {updateNameSucces && (
                    <p className="text-green-600 font-bold mb-2  ">
                      Name successfully Updated
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Update Name
                </button>
              </form>
            </div>
            {/* UPDATE EMAIL FORM*/}
            {/* UPDATE EMAIL FORM*/}
            {/* UPDATE EMAIL FORM*/}
            <div className="mb-12">
              <form onSubmit={handleUpdateEmail}>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  className="mb-4 mt-1 block w-full rounded-md border-green-300 focus:border-green-500 focus:ring-green-500"
                  defaultValue={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <div className="w-60">
                  {updateEmailSucces && (
                    <p className="text-green-600 font-bold mb-2 ">
                      Email succesfully Updated
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Update Email
                </button>
              </form>
            </div>
            {/* UPDATE PASSWORD FORM*/}
            {/* UPDATE PASSWORD FORM*/}
            {/* UPDATE PASSWORD FORM*/}
            <div className="mb-12">
              <form onSubmit={handleUpdatePassword}>
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-700"
                >
                  New Password:
                </label>
                <input
                  id="password"
                  type="password"
                  className="mb-4 mt-1 block w-full rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-700"
                >
                  Repet New Password:
                </label>
                <input
                  id="password"
                  type="password"
                  className="mb-4 mt-1 block w-full rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  onChange={(event) => setRepeatPassword(event.target.value)}
                />
                {passwordsMatchFail && (
                  <p className="text-red-500">Passwords Must Match</p>
                )}
                <div className="w-60">
                  {updatePasswordSucces && (
                    <p className="text-green-600 font-bold mb-2 ">
                      Password succesfully Updated
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
          {/* DANGER ZONE*/}
          {/* DANGER ZONE*/}
          {/* DANGER ZONE*/}
          <div className="w-full border-t pt-40 ">
            <div className="flex justify-end">
              <h1 className="text-3xl font-bold text-red-700">Danger Zone</h1>
            </div>
            <div className="flex justify-end mt-4">
              {dangerZoneActivated ? (
                <button
                  onClick={handleShowWarningMessage}
                  className="bg-red-500 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full max-h-12"
                >
                  X
                </button>
              ) : (
                <button
                  onClick={handleShowWarningMessage}
                  className="bg-red-500 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full"
                >
                  Delete My Account
                </button>
              )}
              {/* RENDER DELETE ACCOUNT CONFIRMATION*/}
              {/* RENDER DELETE ACCOUNT CONFIRMATION*/}
              {/* RENDER DELETE ACCOUNT CONFIRMATION*/}
              {dangerZoneActivated && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative "
                  role="alert"
                >
                  <form onSubmit={handleDeleteAccount}>
                    <label className="block font-bold mb-2">Warning!</label>
                    <label className="block mb-2">
                      Once you delete your account, you will no longer be able
                      to recover your data. Please write
                      <span className="font-bold"> "delete my account"</span> to
                      confirm.
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(event) =>
                        setDeleteAccountConfirmation(event.target.value)
                      }
                    />
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete My Account
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
