import { useState } from "react";

function Calendar({handleShowCalendar, currentDateSelected, setCurrentDateSelected, tasks}) {
  const [currentMonth, setCurrentMonth] = useState(currentDateSelected.getMonth()); // April (dimulai dari 0)
  const [year, setYear] = useState(currentDateSelected.getFullYear());
  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  const firstDay = new Date(year, currentMonth, 1).getDay();
  const days = [];

  const firstDayOffset = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < daysInMonth + firstDayOffset; i++) {
    if (i >= firstDayOffset) {
      days.push(i - firstDayOffset + 1);
    } else {
      days.push('');
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setYear(prevYear => prevYear - 1)
    }
    setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setYear(prevYear => prevYear + 1)
    }
    setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, currentMonth, day)
    setCurrentDateSelected(clickedDate)
    handleShowCalendar()
  }

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar__top">
          <p>{getMonthName(currentMonth)} {year}</p>
          <button className="calendar-btn__close" onClick={handleShowCalendar}>X</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            {Array(Math.ceil(days.length / 7))
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  {days.slice(i * 7, (i + 1) * 7).map((day, j) => {
                    const currentDate = new Date(year, currentMonth, day);
                    const isTaskDate = tasks.some(task => {
                      const taskDate = new Date(task.date);
                      return taskDate.getDate() === currentDate.getDate() && taskDate.getMonth() === currentDate.getMonth() && taskDate.getFullYear() === currentDate.getFullYear();
                    });
                    
                    return (
                      <td key={j} id={day === currentDateSelected.getDate() && currentMonth === currentDateSelected.getMonth() ? "date-selected" : isTaskDate ? "tasks-exist" : null} onClick={() => handleDayClick(day)}>
                        <span>{day}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="calendar__navigation">
          <button onClick={handlePrevMonth}>Back</button>
          <button onClick={handleNextMonth}>Next</button>
        </div>
      </div>
    </div>
  );
}

// Fungsi pembantu untuk mendapatkan nama bulan berdasarkan indeks
function getMonthName(monthIndex) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex];
}

export default Calendar;
