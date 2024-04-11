function InputTask({newTask, handleInputChange, handleInputKeyPress, handleAddTask}) {
  return (
    <div className="task-input">
      <input type="text" value={newTask} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
}

export default InputTask;
