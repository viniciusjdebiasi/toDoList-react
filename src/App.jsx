import { useState, useEffect } from "react";
import React from "react";
import {
  HeartFilledIcon,
  HeartIcon,
  CheckCircledIcon,
  ListBulletIcon,
  TrashIcon,
  PlusCircledIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";

import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [task, setTask] = useState("");
  const [savedTasks, setSavedTasks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCompleteds, setShowCompleteds] = useState(false);
  const [message, setMessage] = useState("");

  const IncludeTask = (event) => {
    event.preventDefault();

    if (!task) {
      setMessage(
        <>
          <h3 className="message">
            {" "}
            Please enter a task <ArrowUpIcon className="icons" />
          </h3>
        </>
      );
    } else {
      setMessage("");

      const ExistingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const NewTask = {
        id: Date.now(),
        name: task,
        favorite: false,
        completed: false,
      };

      const UpdatedTasks = [...ExistingTasks, NewTask];
      localStorage.setItem("tasks", JSON.stringify(UpdatedTasks));

      setTask("");
      setSavedTasks(UpdatedTasks);
    }
  };

  const ShowTasks = () => {
    setShowFavorites(false);
    setShowCompleteds(false);
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setSavedTasks(savedTasks);
  };

  const ShowCompletedTasks = () => {
    setShowCompleteds(true);
    setShowFavorites(false);
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setSavedTasks(savedTasks);
  };

  const ShowFavoriteTasks = () => {
    setShowFavorites(true);
    setShowCompleteds(false);
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setSavedTasks(savedTasks);
  };

  const RemoveTask = (taskId) => {
    const RemainingTasks = savedTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(RemainingTasks));
    setSavedTasks(RemainingTasks);
  };

  const ToggleFavorite = (taskId) => {
    const UpdatedTasks = savedTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, favorite: !task.favorite };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(UpdatedTasks));
    setSavedTasks(UpdatedTasks);
  };

  const ToggleCompleted = (taskId) => {
    const UpdatedTasks = savedTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(UpdatedTasks));
    setSavedTasks(UpdatedTasks);
  };

  return (
    <div className="main" data-aos="fade-down">
      <div className="container-choose">
        <button
          className="button-choose"
          style={{ fontWeight: "bold" }}
          onClick={ShowFavoriteTasks}
        >
          {" "}
          <HeartFilledIcon className="icons" />
          &nbsp;&nbsp;&nbsp;<p>Favorites</p>{" "}
        </button>

        <button
          className="button-choose"
          style={{ fontWeight: "bold" }}
          onClick={ShowCompletedTasks}
        >
          {" "}
          <CheckCircledIcon className="icons" />
          &nbsp;&nbsp;&nbsp;<p>Completed</p>{" "}
        </button>

        <button
          className="button-choose"
          style={{ fontWeight: "bold" }}
          onClick={ShowTasks}
        >
          {" "}
          <ListBulletIcon className="icons" />
          &nbsp;&nbsp;&nbsp;<p>All</p>{" "}
        </button>
      </div>

      <div className="container_tasks">
        <h1 className="title">Create and manage your tasks!</h1>

        <div className="container-add">
          <input
            type="text"
            className="input-add"
            placeholder="Include your task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            autoFocus={true}
            maxLength={50}
          />

          <button
            className="button-add"
            type="button"
            style={{ fontWeight: "bold" }}
            onClick={IncludeTask}
          >
            Add Task&nbsp;&nbsp;&nbsp;
            <PlusCircledIcon className="icons" />
          </button>
        </div>

        {message}

        <div className="tasks" >
          {savedTasks
            .filter(
              (task) =>
                (!showFavorites && !showCompleteds) ||
                (showFavorites && task.favorite) ||
                (showCompleteds && task.completed)
            )
            .map((task) => (
              <p className="task" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="input-checkbox"
                  onChange={() => ToggleCompleted(task.id)}
                />

                {task.name}
                <button
                  className="button-task"
                  onClick={() => ToggleFavorite(task.id)}
                >
                  {task.favorite ? (
                    <HeartFilledIcon className="icons" />
                  ) : (
                    <HeartIcon className="icons" />
                  )}
                </button>
                <button
                  className="button-task"
                  onClick={() => RemoveTask(task.id)}
                >
                  <TrashIcon className="icons" />
                </button>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
