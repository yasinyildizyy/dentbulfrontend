import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IPrepareProps {
  data?: any;
  title?: string;
  completedText?: string;
  onSubmit?: any;
}

const StepPrepare = ({ data, title, completedText, onSubmit }: IPrepareProps) => {
  const [seconds, setSeconds] = useState(0);
  const [stages, setStages]: any = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (seconds !== 100) {
        setSeconds((seconds) => seconds + 1);

        if (seconds + 1 === 20) {
          setStages(stages.concat(data[0]));
        } else if (seconds + 1 === 45) {
          setStages(stages.concat(data[1]));
        } else if (seconds + 1 === 80) {
          setStages(stages.concat(data[2]));
        }
      } else {
        await clearInterval(interval);

        setTimeout(() => {
          onSubmit({
            quizId: null,
            answer: {
              answerId: null,
              text: "",
            },
          });
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="quiz__elements--prepare">
      <h3>{title}</h3>

      <div className="progressbar-circular">
        <CircularProgressbar
          value={seconds}
          text={`${seconds}%`}
          strokeWidth={5}
          styles={buildStyles({
            strokeLinecap: "butt",
          })}
        />
      </div>
      <h4>{seconds === 100 && completedText}</h4>

      <div className="loading-stages">
        {stages?.map((item: any, index: number) => (
          <div key={index} className="loading-stages--item">
            <i className="icofont-checked"></i>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepPrepare;
