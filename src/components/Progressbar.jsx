function Progressbar({progress}) {
  return (
    <div className="progressbar-container">
      <div className="progressbar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{Math.round(progress)}%</p>
    </div>
  );
}

export default Progressbar;
