import { useState } from "react";

const TASKS = [
  {
    id: 1,
    text: "Task 1",
    completed: false,
  },
  {
    id: 2,
    text: "Task 2",
    completed: true,
  },
  {
    id: 3,
    text: "Task 3",
    completed: false,
  },
  {
    id: 4,
    text: "Task 4",
    completed: true,
  },
  {
    id: 5,
    text: "Task 5",
    completed: true,
  },
  {
    id: 6,
    text: "Task 6",
    completed: false,
  },
  {
    id: 7,
    text: "Task 7",
    completed: false,
  },
  {
    id: 8,
    text: "Task 8",
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all")

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, { id: prevTasks[prevTasks.length - 1].id + 1, text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.completed)
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed)
  }

  const totalTasksCount = tasks.length
  const completedTasksCount = tasks.filter(task => task.completed).length
  const progress = totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100

  return (
    <>
      <div className="task-input">
        <input type="text" value={newTask} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="filter-btn">
        <button id={filter === 'all' ? 'filter-current' : null} onClick={() => handleFilterChange('all')}>All</button>
        <button id={filter === 'active' ? 'filter-current' : null}  onClick={() => handleFilterChange('active')}>Active</button>
        <button id={filter === 'completed' ? 'filter-current' : null}  onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>
      <div className="progressbar-container">
        <div className="progressbar">
          <div className="progress" style={{width: `${progress}%`}}></div>
        </div>
        <p>{Math.round(progress)}%</p>
      </div>
      <ul className="tasks">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task" onDoubleClick={() => handleCompleteTask(task.id)}>
            <span className="task-desc">
              <input type="checkbox" onChange={() => handleCompleteTask(task.id)} checked={task.completed} />
              <label id={task.completed ? "task-completed" : null}>{task.text}</label>
            </span>
            <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
