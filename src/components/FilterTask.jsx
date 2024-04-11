function FilterTask({filter, handleFilterChange}) {
  return (
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
  );
}

export default FilterTask;
