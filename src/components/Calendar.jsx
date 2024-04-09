import { useState } from "react";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // April (dimulai dari 0)
  const year = new Date().getFullYear();
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
    setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  return (
    <div className="calendar">
      <div className="calendar__top">
      <p>{getMonthName(currentMonth)} {year}</p>
      <div className="calendar__navigation">
        <button onClick={handlePrevMonth}>Back</button>
        <button onClick={handleNextMonth}>Next</button>
      </div>
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
                {days.slice(i * 7, (i + 1) * 7).map((day, j) => (
                  <td key={j}>{day}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

// Fungsi pembantu untuk mendapatkan nama bulan berdasarkan indeks
function getMonthName(monthIndex) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex];
}

export default Calendar;
