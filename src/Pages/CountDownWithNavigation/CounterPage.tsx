import { useRef, useEffect } from "react";

interface CounterProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const CounterPage = ({ counter, setCounter }: CounterProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prev: number) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, [setCounter]);

  return (
    <div className="page-content">
      <h1>Counter Page</h1>
      <p>Current Count: {counter}</p>
    </div>
  );
};

export default CounterPage;
