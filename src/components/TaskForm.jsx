import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ tasks, taskIndex, editstatus, seteditstatus, setTasks, taskData, setTaskData }) => {

  const refs = useRef([])
  const checkTag = (tag) => {
    return taskData.preriority === tag;
  };

  const selectTag = (tag) => {
    setTaskData((prev) => {
      return { ...prev, preriority: tag };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.task === '') {
      toast.error('Please enter task!');
      refs.current['task'].focus()
      return;
    }
    //console.log(taskData);
    if (editstatus) {
      let list = [...tasks];
      list[taskIndex] = Object.assign({ ...list[taskIndex] }, { ...taskData })
      setTasks(() => { return [...list] })
      seteditstatus(false)
      toast.success('success', 'Task updated successfuly.')
    } else {

      setTasks((prev) => {
        return [...prev, taskData];
      });
      toast.success('Task added successfuly.')
    }
    setTaskData({
      task: "",
      taskDescription: '',
      status: "todo",
      preriority: 'Low',
    });
  };
  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <label>Task *</label>
        <input
          ref={(ref) => refs.current['task'] = ref}
          required={true}
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />
        <label>Task Description</label>
        <textarea
          type="text"
          name="taskDescription"
          value={taskData.taskDescription}
          className="task_input"
          placeholder="Enter your task description"
          onChange={handleChange}
        />

        <div className="task_form_bottom_line">
          <div style={{ width: "100%" }}>
            <label htmlFor="tags">Task Priority</label>
            <div className="tags">
              <Tag
                tagName="Low"
                selectTag={selectTag}
                selected={checkTag("Low")}
              />
              <Tag
                tagName="Medium"
                selectTag={selectTag}
                selected={checkTag("Medium")}
              />
              <Tag
                tagName="High"
                selectTag={selectTag}
                selected={checkTag("High")}
              />
            </div>
          </div>
          {editstatus && <div style={{ width: '100%' }}>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">Select</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>}
          <button type="submit" className="task_submit">
            {!editstatus ? '+ Add Task' : 'Update Task'}
          </button>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
