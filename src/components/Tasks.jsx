function Tasks({filteredTasks, handleCompleteTask, handleDeleteTask}) {
  return (
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
  );
}

export default Tasks;
