import React, { useState } from 'react';
import './Task.css';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', assignee: '' });
  const [editingTask, setEditingTask] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    if (editingTask) {
      setTasks(tasks.map(task => (task.id === editingTask.id ? newTask : task)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now(), progress: 'Not Started' }]);
    }
    setNewTask({ title: '', dueDate: '', assignee: '' });
  };

  const handleEditTask = (task) => {
    setNewTask(task);
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleProgressChange = (taskId, progress) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, progress } : task)));
  };

  return (
    <div className="task-management">
      <h2>Task Management</h2>
      <div className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="assignee"
          placeholder="Assignee"
          value={newTask.assignee}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <div className="task-list">
        <h3>Task List</h3>
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-details">
              <span>{task.title}</span>
              <span>Due: {task.dueDate}</span>
              <span>Assignee: {task.assignee}</span>
            </div>
            <div className="task-actions">
              <select
                value={task.progress}
                onChange={(e) => handleProgressChange(task.id, e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
