import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import styles from "./pause.module.css";

interface ButtonVariants {
  [key: string]: {
    scale: number;
    opacity?: number;
    boxShadow?: string;
    transition?: {
      duration: number;
      ease?: string;
    };
  };
}

// Button animation variants
const buttonVariants: ButtonVariants = {
  initial: {
    scale: 1,
    opacity: 1
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95,
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.1
    }
  },
  disabled: {
    scale: 1,
    opacity: 0.6,
    boxShadow: "none",
    transition: {
      duration: 0.2
    }
  }
};
const PausableCounter: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false)

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);


  const handleStart = (): void => {
    if (!isRunning) {
      const id = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);

      setIntervalId(id);
      setIsRunning(true);

    }
  };
  const handlePause = (): void => {
    if (intervalId) {
      clearInterval(intervalId);

      setIsRunning(false);
      setIsPaused(true)

    }
  };

  const handleReset = (): void => {
    if (intervalId) {
      clearInterval(intervalId);

      setCount(0);
      setIntervalId(null);
      setIsRunning(false);
      setIsPaused(false)

    }
  };

  return (
    <section>
      <Header title="Pausable Counter" className="customH1Tag" />
      <div className={styles.container}>
        <motion.div className={styles.buttons} layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <motion.button
            onClick={handleStart}
            disabled={isRunning}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isRunning ? "disabled" : ""}
          >
            {isPaused ? "Resume" : "Start"}
          </motion.button>

          <motion.button
            onClick={handlePause}
            disabled={!isRunning}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={!isRunning ? "disabled" : ""}
          >
            Pause
          </motion.button>

          <motion.button
            onClick={handleReset}
            disabled={intervalId === null}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={intervalId === null ? "disabled" : ""}
          >
            Reset
          </motion.button>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              color: count > 0 ? "#2563eb" : "#374151", // Blue for positive numbers
              textShadow: count > 10 ? "0 0 8px rgba(73, 160, 231, 0.3)" : "none" // Glow effect for numbers > 10
            }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className={styles.text}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              style={{ color: "#6B7280" }} // Gray color for the "Count:" text
            >
              Count{" "}:{" "}
            </motion.span>
            <motion.span
              animate={{
                color: count < 0 ? "#DC2626" : // Red for negative
                  count > 20 ? "#059669" : // Green for > 20
                    "#2563eb", // Default blue
                scale: [1, 1.1, 1], // Subtle pop effect on change
              }}
              transition={{
                scale: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
            >
              {count}
            </motion.span>
          </motion.span>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PausableCounter;
