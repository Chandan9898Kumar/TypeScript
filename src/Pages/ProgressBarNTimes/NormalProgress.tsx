import React, { useCallback, useMemo } from "react";
import styles from './normal.module.css';

const ProgressBar = React.memo(({ index }: { index: number }) => {
  return (
    <div className={styles.main}>
      <div className={styles.bar} style={{ animationDelay: `${index * 0.5}s` }} />
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";

const NormalProgressBar=()=> {
  const [progressCount, setProgressCount] = React.useState(1);

  const handleAddProgress = useCallback(() => {
    setProgressCount((prev) => Math.min(prev + 1, 10)); // Add upper limit
  }, []);

  const handleReset = useCallback(() => {
    setProgressCount(1);
  }, []);

  const progressBars = useMemo(() => {
    return Array.from({ length: progressCount }, (_, index) => (
      <ProgressBar key={index} index={index} />
    ));
  }, [progressCount]);

  return (
    <div className="container">
      <h1>Progress Bars Demo</h1>

      <div className="progress-container">{progressBars}</div>

      <div className="button-group">
        <button
          onClick={handleAddProgress}
          disabled={progressCount >= 10}
          className="button"
        >
          Add Progress Bar
        </button>
        <button onClick={handleReset} className="button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default NormalProgressBar