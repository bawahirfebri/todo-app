import { useEffect, useState } from "react";

const TASKS = [
  {
    id: Date.now() + 1,
    text: "Task 1",
    completed: false,
    date: "4/11/2024",
  },
  {
    id: Date.now() + 2,
    text: "Task 2",
    completed: true,
    date: "4/9/2024",
  },
  {
    id: Date.now() + 3,
    text: "Task 3",
    completed: false,
    date: "4/11/2024",
  },
  {
    id: Date.now() + 4,
    text: "Task 4",
    completed: true,
    date: "4/11/2024",
  },
  {
    id: Date.now() + 5,
    text: "Task 5",
    completed: true,
    date: "4/9/2024",
  },
  {
    id: Date.now() + 6,
    text: "Task 6",
    completed: false,
    date: "4/9/2024",
  },
  {
    id: Date.now() + 7,
    text: "Task 7",
    completed: false,
    date: "4/11/2024",
  },
  {
    id: Date.now() + 8,
    text: "Task 8",
    completed: false,
    date: "4/10/2024",
  },
];

function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedDateIndex, setSelectedDateIndex] = useState(new Date().getDate());
  const [filteredDateTasks, setFilteredDateTasks] = useState([]);

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

  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const progress = totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100;

  console.log(new Date().getDay(), new Date().getDate(), new Date().getDate() - new Date().getDay() + 1)

  return (
    <>
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
      <div className="progressbar-container">
        <div className="progressbar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{Math.round(progress)}%</p>
      </div>
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
    </>
  );
}

export default App;
