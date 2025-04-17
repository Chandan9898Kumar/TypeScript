import { useState, useEffect, MouseEvent } from "react";
import styles from "./grid.module.css";

export default function GridLight() {
  const [lightOn, setLightOn] = useState<number[]>([]);
  const GRID_LIGHT = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (lightOn.length) {
      timer = setTimeout(() => {
        lightOn.shift();
        const newItem = [...lightOn];
        setLightOn(newItem);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [lightOn]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const numbers = parseInt((event.target as HTMLButtonElement).dataset.index!);
    const newLights = Array.from(new Set([numbers, ...lightOn]));
    document.startViewTransition(() => {
      setLightOn(newLights);
    });
  };

  return (
    <div>
      <h1>Grid Light</h1>

      <div className={styles.parent}>
        {GRID_LIGHT?.flat(GRID_LIGHT.length).map((item, index) => {
          return item ? (
            <Lights
              key={index}
              index={index}
              onClick={handleClick}
              isLightOn={lightOn.includes(index)}
            />
          ) : (
            <span></span>
          );
        })}
      </div>
    </div>
  );
}

interface LightsProps {
  index: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLightOn: boolean;
}

const Lights = ({ index, onClick, isLightOn }: LightsProps) => {
  return (
    <button
      type="button"
      style={{
        backgroundColor: isLightOn ? "green" : "",
        pointerEvents: isLightOn ? "none" : "auto",
      }}
      data-index={index}
      className={styles.child}
      onClick={onClick}
      disabled={isLightOn}
    >
      {index}
    </button>
  );
};
