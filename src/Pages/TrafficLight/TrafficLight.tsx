import { FC, useEffect, useState, useMemo } from "react";
import Header from "../../Components/Header/Header";
import signalStyle from "./signal.module.css";

type SignalType = "red" | "yellow" | "green";

interface Details {
  signal: SignalType;
  delay: number;
}

// This is called an index signature in TypeScript. Let's analyze each part:
//      [key: string]:
// This syntax means that you can use any string as a key to access the object
// The key part could be named anything (like [k: string] or [x: string])
// This interface is useful when you have an object where:
//  The keys are not known in advance
//  You might add or remove keys dynamically

interface Signal<T> {
  [key: string]: T;
}

// It is an example of Generic Interface with Constraints:
const TRAFFIC_SIGNAL: Signal<Details> = {
  red: {
    signal: "yellow",
    delay: 800,
  },
  yellow: {
    signal: "green",
    delay: 1200,
  },
  green: {
    signal: "red",
    delay: 1600,
  },
};

const TrafficLight: FC = () => {
  const [currentSignal, setCurrentSignal] = useState<SignalType>("red");

  useEffect(() => {
    const { signal, delay } = TRAFFIC_SIGNAL[currentSignal];

    const timer = setTimeout(() => {
      setCurrentSignal(signal);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSignal]);


  const getBackgroundColor = useMemo(() =>(signal: SignalType): string =>currentSignal === signal ? signal : "",
    [currentSignal]
  );

  return (
    <section>
      <Header title="Traffic Signal " className="customH1Tag" />
      <div className={signalStyle.main}>
        <div className={signalStyle.signal}>
          <div
            className={signalStyle.red}
            style={{ backgroundColor: getBackgroundColor("red") }}
          ></div>
          <div
            className={signalStyle.yellow}
            style={{ backgroundColor: getBackgroundColor("yellow") }}
          ></div>
          <div
            className={signalStyle.green}
            style={{ backgroundColor: getBackgroundColor("green") }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default TrafficLight;
