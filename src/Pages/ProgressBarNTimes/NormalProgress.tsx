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
    <div className={styles.container}>
      <h1>Progress Bars Normal Demo</h1>

      <div className={styles.progressContainer}>{progressBars}</div>

      <div className={styles.button_group}>
        <button
          onClick={handleAddProgress}
          disabled={progressCount >= 10}
          className={styles.button}
        >
          Add Progress Bar
        </button>
        <button onClick={handleReset} className={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default NormalProgressBar