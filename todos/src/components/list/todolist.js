import React, { useState } from "react";
import "./styles.css";

function Task({ task, onDelete, onEdit, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleTaskClick = () => {
    handleEdit();
  };

  return (
    <li className={task.completed ? "completed" : ""}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleComplete}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span onClick={handleTaskClick}>{task.text}</span>
      )}
      <div className="action-buttons">
        
        <button className="delete-button" onClick={handleDelete}>
        <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
}

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React.js", completed: true },
    { id: 2, text: "Do ToDolist", completed: false },
    { id: 3, text: "Go for a run", completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    if (newTaskText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false
      };

      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId, newText) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: newText };
        }
        return task;
      })
    );
  };

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleChangeNewTask = (e) => {
    setNewTaskText(e.target.value);
  };

  const handleKeyPressNewTask = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTaskText}
          onChange={handleChangeNewTask}
          onKeyPress={handleKeyPressNewTask}
          placeholder="Add a task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="filter">
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onComplete={handleCompleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
