import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiTwotoneEdit, AiFillSetting } from 'react-icons/ai';
const Dashboard = () => {
  const API_URL = process.env.REACT_APP_URL;
  console.log(API_URL);
  const navigate = useNavigate();
  const location = useLocation();
  const response = location.state;
  console.log(response);
  //location.state get what we have passed to this-
  //component when we call it on the previus component using navigate()//

  const [tasks, setTasks] = useState([]);
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [description, setNewTaskDescription] = useState('');
  console.log(description);

  const [completed, setNewTaskCompleted] = useState(false);
  const [editable, setEditable] = useState(false);
  const [sortByToggle, setSortByToogle] = useState(false);

  const [showShortByButton, setShowShortByButton] = useState(false);

  const [editableTaskId, setEditableTaskId] = useState('');
  console.log(editable);

  const handleNavigateSettings = () => {
    navigate('/settings', { state: response });
  };

  useEffect(() => {
    if (!response || !response.user) {
      navigate('/');
    } else {
      axios
        .get(`${API_URL}/tasks`, { headers })
        .then((response) => {
          console.log('response', response.data);
          setTasks(response.data);
          console.log('tasks', tasks);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []); // empty dependency array to ensure this effect runs only once

  useEffect(() => {
    console.log('tasks from new useEffect', tasks);
  }, [tasks]);
  if (!response || !response.user) {
    return null;
  }

  const headers = response
    ? {
        Authorization: `Bearer ${response.token}`,
      }
    : {};

  const fetchAllTasks = () => {
    axios
      .get(`${API_URL}/tasks`, { headers })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
        setSortByToogle(!setSortByToogle);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteTask = (taskID) => {
    axios
      .delete(`${API_URL}/tasks/${taskID}`, { headers })
      .then((response) => {
        console.log(response);
        setTasks(tasks.filter((task) => task._id !== taskID));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleToggleAddTask = () => {
    setToggleAddTask(!toggleAddTask);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    axios
      .post(
        `${API_URL}/tasks`,
        {
          description,
          completed,
        },
        { headers }
      )
      .then((response) => {
        console.log(response);
        setTasks([...tasks, response.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditTask = (taskID) => {
    console.log(taskID);
    setEditableTaskId(taskID);
  };

  const handleCancelEdit = () => {
    setEditableTaskId('');
  };

  const handleUpdateTask = async (taskID) => {
    ///UPDATE THE DESCRIPTION  OF THE TAKS///
    await axios
      .patch(`${API_URL}/tasks/${taskID}`, { description }, { headers })
      .then(() => {
        setEditableTaskId(''); // Reset the editable task ID after updating
      });
    ///FETCH ALL TASKS TO BE EABLE TO RE RENDER THE TASKS WITH THE UPDATE DONE///
    await axios
      .get(`${API_URL}/tasks`, { headers })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdateCompleted = async (taskID, completed) => {
    ///UPDATE THE STATUS ON COMPLETETION OF THE TAKS///
    await axios.patch(`${API_URL}/tasks/${taskID}`, { completed }, { headers });
    ///FETCH ALL TASKS TO BE EABLE TO RE RENDER THE TASKS WITH THE UPDATE DONE///
    await axios
      .get(`${API_URL}/tasks`, { headers })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSortCompletedTasks = () => {
    axios
      .get(`${API_URL}/tasks?completed=true`, { headers })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
        setSortByToogle(!sortByToggle);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSortIncompletedTasks = () => {
    axios
      .get(`${API_URL}/tasks?completed=false`, { headers })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setTasks(response.data);
        setSortByToogle(!sortByToggle);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSortAscendingOrder = () => {
    axios
      .get(`${API_URL}/tasks?sortBy=createdAt:asc`, { headers })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setTasks(response.data);
        setSortByToogle(!sortByToggle);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSortDescendingOrder = () => {
    axios
      .get(`${API_URL}/tasks?sortBy=createdAt:desc`, { headers })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setTasks(response.data);
        setSortByToogle(!sortByToggle);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleToggleSortBy = () => {
    setSortByToogle(!sortByToggle);
  };

  return (
    <div className=" pt-6 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wider mb-6">
        TASK
        <span className="text-green-200 md:text-green-300 lg:text-green-400">
          APP
        </span>
      </h1>

      <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-slate-300 rounded-lg shadow-lg py-8 px-10 space-y-8 inline-block">
        <div>
          <h2
            className="text-xl font-bold text-gray-800"
            style={{ float: 'left' }}
          >
            Welcome, {response.user.name}!
          </h2>
          <AiFillSetting
            className="text-2xl ml-48"
            style={{ float: 'right' }}
            onClick={handleNavigateSettings}
          />
        </div>

        <h1 className="text-5xl font-bold text-gray-800 tracking-wider">
          MY<span className="text-green-500">TASKS</span>
        </h1>

        {/* ADD TASK BUTTON*/}
        {/* ADD TASK BUTTON*/}
        {/* ADD TASK BUTTON*/}
        <div className="text-center bg-gray-100 rounded-lg p-4 mb-4">
          <button
            onClick={handleToggleAddTask}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mb-1"
          >
            Add Task
          </button>
          {/* FILL OUT THE TASK FORM*/}
          {/* FILL OUT THE TASK FORM*/}
          {/* FILL OUT THE TASK FORM*/}
          {toggleAddTask && (
            <form
              onSubmit={handleAddTask}
              className="flex flex-col items-center"
            >
              <div className="w-full mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className="appearance-none border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  onChange={(event) =>
                    setNewTaskDescription(event.target.value)
                  }
                ></input>
              </div>
              <div className="w-full mb-4">
                <label className="inline-flex items-center text-gray-700 font-bold">
                  <span className="mr-2">Completed</span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    onChange={() => setNewTaskCompleted(!completed)}
                  ></input>
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Add
              </button>
            </form>
          )}
        </div>
        {/* SORT BY BUTTON*/}
        {/* SORT BY BUTTON*/}
        {/* SORT BY BUTTON*/}

        {tasks.length !== 0 && (
          <div className="flex flex-col bg-gray-100 rounded-lg p-4 mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={handleToggleSortBy}
            >
              Sort By
            </button>
            {sortByToggle && (
              <div className="flex flex-col space-y-2">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={fetchAllTasks}
                >
                  All
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleSortCompletedTasks}
                >
                  Completed
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleSortIncompletedTasks}
                >
                  Incompleted
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleSortAscendingOrder}
                >
                  Oldest
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleSortDescendingOrder}
                >
                  Newest
                </button>
              </div>
            )}
          </div>
        )}

        {/* RENDER TASKS IF ADDED*/}
        {/* RENDER TASKS IF ADDED*/}
        {/* RENDER TASKS IF ADDED*/}

        {tasks &&
          tasks.map((task) => (
            <div key={task._id} className="bg-gray-100 rounded-lg p-4 mb-4">
              <AiTwotoneEdit
                className="inline-block text-lg"
                onClick={() => handleEditTask(task._id)}
                title="Edit"
              />{' '}
              {editableTaskId === task._id ? (
                <div className="flex flex-col items-center mb-2">
                  {/* This is the edit form */}
                  <div className="mb-2">
                    <input
                      type="text"
                      defaultValue={task.description}
                      onChange={(event) =>
                        setNewTaskDescription(event.target.value)
                      }
                      placeholder="Edit task description"
                      className="border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></input>
                  </div>
                  <div className="flex">
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateTask(task._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div className="inline-block">
                  <h1 className="text-2xl font-medium mb-3 inline-block">
                    {task.description}
                  </h1>
                  {/* Rest of the task details */}
                </div>
              )}
              <div className="">
                <span className="font-semibold">Status: </span>{' '}
                <input
                  type="checkbox"
                  checked={task.completed ? true : false}
                  onChange={() =>
                    handleUpdateCompleted(task._id, !task.completed)
                  }
                ></input>
                {task.completed ? (
                  <p className="text-green-500 font-bold inline-block">
                    Completed
                  </p>
                ) : (
                  <p className="text-red-500 font-bold inline-block ">
                    Incomplete
                  </p>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
