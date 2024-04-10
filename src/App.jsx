import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";

const TASKS_STORAGE_KEY = "tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentDateSelected, setCurrentDateSelected] = useState(new Date())
  const [filteredDateTasks, setFilteredDateTasks] = useState([]);
  const [isCalendarShow, setIsCalendarShow] = useState(false)

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setFilteredDateTasks(tasks.filter((task) => task.date === currentDateSelected.toLocaleDateString()));
  }, [tasks, currentDateSelected]);

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
        date: currentDateSelected.toLocaleDateString(),
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

  const handleFilterDateChange = (getDate, currentDateSelected) => {
    setFilter("all");
    setCurrentDateSelected(currentDateSelected)

    setFilteredDateTasks(tasks.filter((task) => task.date === currentDateSelected.toLocaleDateString()));
  };

  const handlePrevDate = () => {
    const currentDate = new Date(currentDateSelected)

    if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 7)
    else currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    
    setCurrentDateSelected(currentDate)
  }

  const handleNextDate = () => {
    const currentDate = new Date(currentDateSelected)

    if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    else currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 8)
    
    setCurrentDateSelected(currentDate)
  }

  const handleShowCalendar = () => {
    setIsCalendarShow(prevState => !prevState)
  }

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
      <div className="task-input">
        <input type="text" value={newTask} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
        <button onClick={handleAddTask}>Add</button>
      </div>
      {isCalendarShow && <Calendar handleShowCalendar={handleShowCalendar} currentDateSelected={currentDateSelected} setCurrentDateSelected={setCurrentDateSelected} tasks={tasks} />}
      <div className="tasks-date">
        <div className="tasks-date__navigation">
          <button onClick={handlePrevDate}>&lt;</button>
          <p onClick={handleShowCalendar}>{currentDateSelected.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          <button onClick={handleNextDate}>&gt;</button>
        </div>
        <ul className="tasks-date__week">
          {Array.from({ length: 7 }, (_, index) => {
            const currentDate = new Date(currentDateSelected)

            if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() - currentDate.getDay() + index - 6)
            else currentDate.setDate(currentDate.getDate() - currentDate.getDay() + index + 1)

            return (
              <li key={index} id={currentDate.getDate() === currentDateSelected.getDate() ? "tasks-date__current" : null} onClick={() => handleFilterDateChange(currentDate.getDate(), currentDate)}>
                <span className="task-date__day">{currentDate.toLocaleDateString("en-US", { weekday: "short" })}</span>
                <span className="task-date__date">{currentDate.getDate()}</span>
              </li>
            );
          })}
        </ul>
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
      {tasks.length > 0 && <div className="progressbar-container">
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
