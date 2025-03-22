import { ChangeEvent, memo, useCallback, useRef, useState } from "react";
import styles from "./watch.module.css";

interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
}

const StopWatch = () => {
  const [time, setTime] = useState<TimeState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleTimeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, field: keyof TimeState): void => {
      const value = Number(event.target.value);
      if (isNaN(value) || value < 0) return;

      const maxValues = {
        hours: 99,
        minutes: 59,
        seconds: 59,
      };

      if (value > maxValues[field]) return;

      setTime((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const startStopWatch = useCallback((): void => {
    if (!isRunning) {
      timer.current = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1;
          if (newSeconds > 59) {
            const newMinutes = prevTime.minutes + 1;
            if (newMinutes > 59) {
              return {
                seconds: 0,
                minutes: 0,
                hours: prevTime.hours + 1,
              };
            }
            return {
              ...prevTime,
              seconds: 0,
              minutes: newMinutes,
            };
          }
          return {
            ...prevTime,
            seconds: newSeconds,
          };
        });
      }, 100);
      setIsRunning(true);
    } else {
      if (timer.current !== null) {
        clearInterval(timer.current);
      }
      setIsRunning(false);
    }
  }, [isRunning]);

  const resetWatch = useCallback((): void => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
    if (timer.current !== null) {
      clearInterval(timer.current);
    }
  }, []);

  return (
    <section>
      <h1>Stop Watch</h1>
      <div className={styles.main}>
        <input
          type="tel"
          value={time.hours}
          maxLength={2}
          onChange={(e) => handleTimeChange(e, "hours")}
        />{" "}
        :
        <input
          type="tel"
          value={time.minutes}
          maxLength={2}
          onChange={(e) => handleTimeChange(e, "minutes")}
        />{" "}
        :
        <input
          type="tel"
          value={time.seconds}
          maxLength={2}
          onChange={(e) => handleTimeChange(e, "seconds")}
        />
      </div>
      <div className={styles.btn}>
        <button onClick={startStopWatch}>
          {isRunning ? "Stop Watch" : "Start Watch"}
        </button>
        <button onClick={resetWatch}>Reset</button>
      </div>
    </section>
  );
};

export default memo(StopWatch);
