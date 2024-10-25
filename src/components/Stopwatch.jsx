import React, { useEffect, useRef, useState } from "react";
import "../style.scss";

const Stopwatch = () => {
  const [inProgress, setInProgress] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const interval = useRef(null);
  const startTime = useRef(0);

  useEffect(() => {
    if (inProgress) {
      startTime.current = Date.now() - timeElapsed; // Update startTime only when starting
      interval.current = setInterval(() => {
        setTimeElapsed(Date.now() - startTime.current);
      }, 10);
    } else {
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
  }, [inProgress, timeElapsed]);

  const start = () => setInProgress(true);
  const stop = () => setInProgress(false);
  const reset = () => {
    setInProgress(false);
    setTimeElapsed(0);
  };

  const formatTime = () => {
    const hours = String(Math.floor(timeElapsed / 3600000)).padStart(2, "0");
    const minutes = String(
      Math.floor((timeElapsed % 3600000) / 60000)
    ).padStart(2, "0");
    const seconds = String(Math.floor((timeElapsed % 60000) / 1000)).padStart(
      2,
      "0"
    );
    const milliseconds = String(Math.floor((timeElapsed % 1000) / 10)).padStart(
      2,
      "0"
    );

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="inner">
        <div className="display">{formatTime()}</div>
        <div className="buttons">
          <button className="start-btn" onClick={start}>
            Start
          </button>
          <button className="stop-btn" onClick={stop}>
            Stop
          </button>
          <button className="reset-btn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
