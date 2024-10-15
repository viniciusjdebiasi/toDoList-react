import { useState, useEffect } from "react";
import React from "react";
import {
  HeartFilledIcon,
  HeartIcon,
  CheckCircledIcon,
  ListBulletIcon,
  TrashIcon,
  PlusCircledIcon,
  ArrowUpIcon
} from "@radix-ui/react-icons";

import "./App.css";

function App() {
  const [task, setTask] = useState(""); // Armazena o valor da nova tarefa
  const [savedTasks, setSavedTasks] = useState([]); // Armazena todas as tarefas
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCompleteds, setShowCompleteds] = useState(false);
  const [message, setMessage] = useState("");

  // Função para incluir uma nova tarefa
  const IncludeTask = (event) => {
    event.preventDefault();

    if (!task) {
      setMessage(
        <>
          <h3 className="message"> Please enter a task <ArrowUpIcon className="icons" /></h3>
        </>
      );
    } else {
      setMessage("");

      const ExistingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const NewTask = {
        id: Date.now(),
        name: task,
        favorite: false, // Adiciona um campo para "favoritar"
        completed: false, // Adiciona um campo para "concluída"
      };

      const UpdatedTasks = [...ExistingTasks, NewTask];
      localStorage.setItem("tasks", JSON.stringify(UpdatedTasks)); // Atualiza o LocalStorage

      setTask(""); // Limpa o input
      setSavedTasks(UpdatedTasks); // Atualiza o estado com a nova lista de tarefas
    }
  };

  // Função para exibir as tarefas ao carregar a página
  const ShowTasks = () => {
    setShowFavorites(false)
    setShowCompleteds(false)
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setSavedTasks(savedTasks); // Atualiza o estado com as tarefas salvas
  };

  // Função para mostrar tarefas completas
  const ShowCompletedTasks = () => {
    setShowCompleteds(true); // Define para mostrar apenas as tarefas favoritas
    setShowFavorites(false)
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setSavedTasks(savedTasks); // Atualiza o estado com as tarefas salvas
  };

  // Função para mostrar tarefas favoritas
  const ShowFavoriteTasks = () => {
    setShowFavorites(true); // Define para mostrar apenas as tarefas favoritas
    setShowCompleteds(false)
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setSavedTasks(savedTasks); // Atualiza o estado com as tarefas salvas
  };

  // Função para remover uma tarefa
  const RemoveTask = (taskId) => {
    const RemainingTasks = savedTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(RemainingTasks));
    setSavedTasks(RemainingTasks); // Atualiza o estado
  };

  // Função para marcar/desmarcar uma tarefa como favorita
  const ToggleFavorite = (taskId) => {
    const UpdatedTasks = savedTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, favorite: !task.favorite }; // Alterna o status de favorito
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(UpdatedTasks));
    setSavedTasks(UpdatedTasks); // Atualiza o estado
  };

  // Função para marcar/desmarcar uma tarefa como completa
  const ToggleCompleted = (taskId) => {
    const UpdatedTasks = savedTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }; // Alterna o status de favorito
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(UpdatedTasks));
    setSavedTasks(UpdatedTasks); // Atualiza o estado
  };

  return (
    <div className="main">
      <div className="container-choose">
        <button className="button-choose" style={{ fontWeight: "bold" }} onClick={ShowFavoriteTasks}>
          {" "}
          <HeartFilledIcon className="icons" />
          &nbsp;&nbsp;&nbsp;<p>Favorites</p>{" "}
        </button>

        <button className="button-choose" style={{ fontWeight: "bold" }} onClick={ShowCompletedTasks}>
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

        <div className="tasks">
          {savedTasks
          .filter((task) => (!showFavorites && !showCompleteds) || // Exibe todas as tarefas
          (showFavorites && task.favorite) || // Exibe apenas favoritas
          (showCompleteds && task.completed))
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
                {task.favorite ? <HeartFilledIcon className="icons" /> : <HeartIcon className="icons" /> }
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
