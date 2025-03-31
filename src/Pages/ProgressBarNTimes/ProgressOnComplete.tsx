import { useEffect, useState, useRef, useCallback, memo } from "react";
import ReactDOM from "react-dom";
import styles from "./normal.module.css";

interface BarData {
  id: number;
}

const ProgressOnComplete = () => {
  const [activeBar, setActiveBar] = useState(1);
  const [progressBar, setProgressBar] = useState<BarData[]>([]);

  const addProgress = useCallback(() => {
    setProgressBar(prev => [...prev, { id: prev.length + 1 }]);
  }, []);

  const progressComplete = useCallback((id: number) => {
    ReactDOM.flushSync(() => {
      setActiveBar(id + 1);
    });
  }, []);

  return (
    <div>
      <h1>Animate multiple progress bars in a sequence</h1>
      <div className={styles.btns}>
        <button className={styles.bt} onClick={addProgress}>
          Add Animation
        </button>
      </div>

      {progressBar.map((item) => (
        <ProgressBar
          key={item.id}
          isProgressActive={activeBar === item.id}
          onProgressComplete={() => progressComplete(item.id)}
          id={item.id}
        />
      ))}
    </div>
  );
};

interface ProgressBarProps {
  isProgressActive: boolean;
  onProgressComplete: () => void;
  id: number;
}

const ProgressBar = memo(({
  isProgressActive,
  onProgressComplete,
}: ProgressBarProps) => {
  const [width, setWidth] = useState(0);
  const animationRef = useRef<number>();
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    if (isProgressActive) {
    //   setWidth(0);
      lastUpdateTime.current = performance.now();

      const animate = (currentTime: number) => {
        if (currentTime - lastUpdateTime.current >= 400) {
          setWidth(prev => {
            if (prev >= 100) {
              onProgressComplete();
              return 100;
            }
            lastUpdateTime.current = currentTime;
            return prev + 10;
          });
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isProgressActive, onProgressComplete]);

  return (
    <div className={styles.threeContainer}>
      <div 
        className={styles.threeMain} 
        style={{ width: `${width}%` }}
      />
    </div>
  );
});

export default ProgressOnComplete;


// React.memo : Added memoization to the ProgressBar component to prevent unnecessary re-renders when props haven't changed.

// requestAnimationFrame : Replaced setInterval with requestAnimationFrame for smoother animations and better performance. This is more efficient for animations as it syncs with the browser's refresh rate.

// Callback Optimization : Made addProgress a useCallback to prevent unnecessary recreation of the function.

// Batch Updates : Used ReactDOM.flushSync for state updates that need to be processed immediately.

// Cleanup : Improved cleanup logic using cancelAnimationFrame instead of clearInterval.













/**                    2nd Method, By looping inside Progress Component





import React, { useEffect, useState, useRef, useCallback } from 'react';
import './style.css';

export default function App() {
  const [progressBar, setProgressBar] = useState([]);

  const addProgress = () => {
    setProgressBar((prev) => [...prev, { id: prev.length + 1 }]);
  };

  return (
    <div>
      <h1>Animate multiple progress bars in a sequence</h1>
      <div className="btns">
        <button className="bt" onClick={addProgress}>
          Add Animation
        </button>
      </div>
      <ProgressBar progressBar={progressBar} />
    </div>
  );
}

const ProgressBar = ({ progressBar }) => {
  const [width, setWidth] = useState(0);
  const [activeBar, setActiveBar] = useState(1);

  const timer = useRef();
  const [isBarActive, setIsBarActive] = useState(false);

  useEffect(() => {
    if (progressBar.length) {
      progressBar.forEach((item) => {
        if (item.id === activeBar) {
          setIsBarActive(true);
        }
      });
    }
  }, [progressBar, activeBar]);

  const progressComplete = useCallback(
    (id) => {
      setActiveBar(activeBar + 1);
    },
    [activeBar, progressBar]
  );

  useEffect(() => {
    if (isBarActive) {
      timer.current = setInterval(() => {
        setWidth((prev) => {
          if (prev >= 100) {
            clearInterval(timer.current);
            setIsBarActive(false);
            setTimeout(() => {
              progressComplete();
            }, 0);

            return 0;
          }

          return prev + 10;
        });
      }, 800);
    }

    return () => clearInterval(timer.current);
  }, [isBarActive]);

  return (
    <>
      {progressBar.map((item, index) => {
        return (
          <div className="conatiner" key={item.id}>
            <div
              className="progress"
              style={{
                width: `${
                  activeBar === item.id ? width : item.id < activeBar ? 100 : 0
                }%`,
              }}
            >
              {item.id}
            </div>
          </div>
        );
      })}
    </>
  );
};

 */
