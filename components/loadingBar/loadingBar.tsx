import React, { useEffect, useState } from "react";

const LoadingBar = ({ content, onAction }: any) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (seconds !== 100) {
        setSeconds((seconds) => seconds + 1);
      } else {
        await clearInterval(interval);
        onAction();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="c-loading--bar">
      <h2>{seconds}%</h2>
      <div className="progress">
        <div className="bar" style={{ width: `${seconds}%` }} />
      </div>
      <h3>{content}</h3>
    </div>
  );
};

export default LoadingBar;
