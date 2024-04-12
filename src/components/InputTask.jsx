function InputTask({ newTask, handleInputChange, handleInputKeyPress, handleAddTask, handleToggleTune }) {
  return (
    <div className="task-controls">
      <div className="task-input">
        <input type="text" value={newTask} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <span className="material-symbols-outlined" onClick={handleToggleTune}>tune</span>
    </div>
  );
}

export default InputTask;
