import { useEffect, useState } from "react";

const TASKS_STORAGE_KEY = "tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedDateIndex, setSelectedDateIndex] = useState(new Date().getDate());
  const [filteredDateTasks, setFilteredDateTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setFilteredDateTasks(tasks.filter((task) => task.date === currentDate));
  }, []);

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
      const newTaskObject = {
        id: Date.now(),
        text: newTask,
        completed: false,
        date: new Date().toLocaleDateString(),
      };

      setTasks((prevTasks) => [...prevTasks, newTaskObject]);
      setFilteredDateTasks((prevTasks) => [...prevTasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
    setFilteredDateTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setFilteredDateTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleFilterDateChange = (getDate, currentDate) => {
    setFilter("all");
    setSelectedDateIndex(getDate);

    setFilteredDateTasks(tasks.filter((task) => task.date === currentDate));
  };

  let filteredTasks = filteredDateTasks;
  if (filter === "active") {
    filteredTasks = filteredDateTasks.filter((task) => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = filteredDateTasks.filter((task) => task.completed);
  }

  filteredTasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const progress = totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100;

  return (
    <div className="app">
      <h1 className="todo-app">TODO APP</h1>
      <ul className="tasks-date">
        {Array.from({ length: 7 }, (_, index) => {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - new Date().getDay() + 1 + index);

          return (
            <li key={index} id={selectedDateIndex === currentDate.getDate() ? "tasks-date__current" : null} onClick={() => handleFilterDateChange(currentDate.getDate(), currentDate.toLocaleDateString())}>
              <span>{currentDate.toLocaleDateString("en-US", { weekday: "short" })[0]}</span>
              <span>{currentDate.getDate()}</span>
            </li>
          );
        })}
      </ul>
      <div className="task-input">
        <input type="text" value={newTask} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="filter-btn">
        <button id={filter === "all" ? "filter-current" : null} onClick={() => handleFilterChange("all")}>
          All
        </button>
        <button id={filter === "active" ? "filter-current" : null} onClick={() => handleFilterChange("active")}>
          Active
        </button>
        <button id={filter === "completed" ? "filter-current" : null} onClick={() => handleFilterChange("completed")}>
          Completed
        </button>
      </div>
      {filteredTasks.length > 0 && <div className="progressbar-container">
        <div className="progressbar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{Math.round(progress)}%</p>
      </div>}
      {filteredTasks.length === 0 && <div className="tasks-empty">
        <p>Tasks empty</p>
      </div>}
      <ul className="tasks">
        {filteredTasks.map((task) => (
          <li key={task.id} id={task.completed ? "task-completed" : null} className="task" onDoubleClick={() => handleCompleteTask(task.id)}>
            <span className="task-desc">
              <input type="checkbox" onChange={() => handleCompleteTask(task.id)} checked={task.completed} />
              <label id={task.completed ? "task-completed__text" : null}>{task.text}</label>
            </span>
            <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
