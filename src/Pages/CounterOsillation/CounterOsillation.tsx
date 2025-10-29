import { useState, useRef, memo, useCallback } from "react";
import "./osillation.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className: string;
  disabled: boolean;
}

const Button = ({
  label,
  onClick,
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

const ButtonMemo = memo(Button);

const OscillatingCounter = () => {
  const [count, setCount] = useState(0);
  const [id, setID] = useState<NodeJS.Timeout | null>(null);
  const direction = useRef("up");

  const handleStartCounter = useCallback(() => {
    if (id) {
      clearInterval(id);
      setID(null);
      return;
    }
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (direction.current === "up") {
          if (prevCount === 10) {
            direction.current = "down";
            return 9;
          }
          return prevCount + 1;
        } else {
          if (prevCount == 0) {
            direction.current = "up";
            return 1;
          }
          return prevCount - 1;
        }
      });
    }, 1000);
    setID(interval);
  }, [id]);

  const handleReset = useCallback(() => {
    if (id) {
      clearInterval(id);
    }
    setCount(0);
    setID(null);
    direction.current = "up";
  }, [id]);

  return (
    <div className="counter-app-container">
      <h1>{count}</h1>
      <p>
        Counting Direction : {"  "} {direction.current}
      </p>

      <div className="btn">
        <ButtonMemo
          key="Play"
          disabled={!!id}
          label="Play"
          className="primary"
          onClick={handleStartCounter}
        />
        <ButtonMemo
          key="Pause"
          disabled={!id}
          label="Pause"
          className="secondary"
          onClick={handleStartCounter}
        />
        <ButtonMemo
          disabled={false}
          key="Reset"
          label="Reset"
          className="natives"
          onClick={handleReset}
        />
      </div>
    </div>
  );
};

export default OscillatingCounter;
