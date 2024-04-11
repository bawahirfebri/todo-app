function DateTask({handlePrevDate, handleNextDate, handleShowCalendar, currentDateSelected, handleFilterDateChange}) {
  return (
    <div className="tasks-date">
      <div className="tasks-date__navigation">
        <button onClick={handlePrevDate}>&lt;</button>
        <p onClick={handleShowCalendar}>{currentDateSelected.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        <button onClick={handleNextDate}>&gt;</button>
      </div>
      <ul className="tasks-date__week">
        {Array.from({ length: 7 }, (_, index) => {
          const currentDate = new Date(currentDateSelected);

          if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() - currentDate.getDay() + index - 6);
          else currentDate.setDate(currentDate.getDate() - currentDate.getDay() + index + 1);

          return (
            <li key={index} id={currentDate.getDate() === currentDateSelected.getDate() ? "tasks-date__current" : null} onClick={() => handleFilterDateChange(currentDate.getDate(), currentDate)}>
              <span className="task-date__day">{currentDate.toLocaleDateString("en-US", { weekday: "short" })}</span>
              <span className="task-date__date">{currentDate.getDate()}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DateTask;
