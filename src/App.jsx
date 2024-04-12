import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import InputTask from "./components/InputTask";
import DateTask from "./components/DateTask";
import FilterTask from "./components/FilterTask";
import Progressbar from "./components/Progressbar";
import Tasks from "./components/Tasks";
import EmptyTasks from "./components/EmptyTasks";

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
  const [isTuneOpen, setIsTuneOpen] = useState(false);


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

  const handleToggleTune = () => {
    setIsTuneOpen(prevState => !prevState)
  }

  let filteredTasks = filteredDateTasks;
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const progress = totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100;

  return (
    <div className="app">
      <h1 className="todo-app">TODO APP</h1>
      <InputTask newTask={newTask} handleInputChange={handleInputChange} handleInputKeyPress={handleInputKeyPress} handleAddTask={handleAddTask} handleToggleTune={handleToggleTune} />
      {isCalendarShow && <Calendar handleShowCalendar={handleShowCalendar} currentDateSelected={currentDateSelected} setCurrentDateSelected={setCurrentDateSelected} tasks={tasks} />}
      {isTuneOpen && <DateTask handlePrevDate={handlePrevDate} handleNextDate={handleNextDate} handleShowCalendar={handleShowCalendar} currentDateSelected={currentDateSelected} handleFilterDateChange={handleFilterDateChange} />}
      <FilterTask filter={filter} handleFilterChange={handleFilterChange} />
      {tasks.length > 0 && <Progressbar progress={progress} />}
      {filteredTasks.length === 0 && <EmptyTasks />}
      {filteredTasks.length > 0 && <Tasks filteredTasks={filteredTasks} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} />}
    </div>
  );
}

export default App;
