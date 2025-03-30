import { useState, useEffect, useCallback, memo } from "react";
import styles from "./normal.module.css";

const ProgressWithTimer = () => {
  const [count, setCount] = useState<number[]>([1]);

  const handleClick = () => {
    setCount((prev) => [...prev, prev.length + Number(Math.random().toFixed(2))]);
  };

  const removeItemAfterDelay = useCallback((value:number) => {
    setCount((prev) => prev.filter((item) => item !== value));
  }, []);

  return (
    <div>
      <h1>Progress Bar Timer </h1>

      {count?.map((item) => {
        return (
          <ProgressBarMemo
            key={item}
            item={item}
            handleRemove={removeItemAfterDelay}
          />
        );
      })}

      <div className={styles.btnTwo}>
        <button onClick={handleClick}>Add</button>
      </div>
      
    </div>
  );
};

interface ProgressBarProps {
  item: number;
  handleRemove: (value: number) => void;
}
const ProgressBar = ({ item, handleRemove }: ProgressBarProps) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemove(item);
    }, 3000);

    return () => {
        clearTimeout(timer);
    };
  }, [item, handleRemove]);

  return (
    <div className={styles.containerTwo}>
      <div className={styles.mainTwo}>{item}</div>
    </div>
  );
};

const ProgressBarMemo = memo(ProgressBar);

export default ProgressWithTimer;
