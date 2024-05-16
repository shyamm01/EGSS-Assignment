import { useState, useEffect } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [editstatus, seteditstatus] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [taskData, setTaskData] = useState({
    task: "",
    taskDescription: '',
    status: "todo",
    preriority: 'Low',
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
    toast.success('Task deleted succuessfuly.')
  };

  const handleEdit = (taskIndex) => {
    const [item] = tasks.filter((task, index) => index === taskIndex);
    if (item) {
      setTaskData((predata) => ({ ...predata, task: item.task, taskDescription: item.taskDescription, preriority: item.preriority, status: item.status }));
      seteditstatus(true)
      setTaskId(taskIndex)

    }
  }

  return (
    <div className="app">
      <h1 style={{ margin: "5px 20px" }}>To-do App</h1>
      <TaskForm taskIndex={taskId} tasks={tasks} editstatus={editstatus} seteditstatus={seteditstatus} setTasks={setTasks} taskData={taskData} setTaskData={setTaskData} />
      <main className="app_main">
        <TaskColumn
          title="All To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <TaskColumn
          title="Pending"
          icon={doingIcon}
          tasks={tasks}
          status="pending"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <ToastContainer />
    </div>
  );
};

export default App;
