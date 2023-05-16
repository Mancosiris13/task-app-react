import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const response = location.state;
  //location.state get what we have passed to this-
  //component when we call it on the previus component using navigate()//

  const [dangerZoneActivated, setDangerZoneActivated] = useState(false);
  const [deleteAccountConfirmation, setDeleteAccountConfirmation] =
    useState('');
  console.log(deleteAccountConfirmation);

  useEffect(() => {
    if (!response || !response.user) {
      navigate('/');
    }
  }, [navigate, response]);

  const headers = response
    ? {
        Authorization: `Bearer ${response.token}`,
      }
    : {};

  const handleLogOut = () => {
    axios
      .post('http://localhost:4000/users/logout', {}, { headers })
      .then(() => {
        navigate('/logout');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogOutAll = () => {
    axios
      .post('http://localhost:4000/users/logoutAll', {}, { headers })
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
        .delete('http://localhost:4000/users/me', { headers })
        .then((response) => {
          console.log(response);
          console.log('Account Succesfully deleted');
          navigate('/');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleReturn = () => {
    navigate('/dashboard', { state: response });
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

          <div className="w-full border-t pt-40 ">
            <div className="flex justify-end">
              <h1 className="text-xl font-bold text-gray-700">Danger Zone</h1>
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
