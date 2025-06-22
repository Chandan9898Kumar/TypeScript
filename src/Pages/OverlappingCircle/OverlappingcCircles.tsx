import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { CircleOverlapSchema } from "./Schema";
import { circlesOverlap, getRandomColor } from "./Utils";
import styles from "./circle.module.css";

export default function OverlapingCircle() {
  // store the configuration of each circle
  const [elementsCoordinates, setElementsCoordinates] = useState<CircleOverlapSchema[]>([]);

  // Set a default size that can be changed
  const [circleSize] = useState<number>(100);

  useEffect(() => {

    const draw = (event: MouseEvent) => {
      const xCordinate = event.clientX;
      const yCordinate = event.clientY;

      setElementsCoordinates((prevState) => {
        const elemLength = prevState.length;
        const current = {
          x: xCordinate,
          y: yCordinate,
          size: circleSize, // Store the size with each circle
          background: "red",
        };

        // Check for collisions with existing circles
        for (let i = 0; i < elemLength; i++) {
          if (circlesOverlap(current, prevState[i])) {
            current.background = getRandomColor();
            break;
          }
        }

        return [...prevState, current];
      });
    };

    document.addEventListener("click", draw);

    return () => {
      document.removeEventListener("click", draw);
    };
  }, [circleSize]);

 

  return (
    <div className={styles.main}>
      <h1>Intersect Circle</h1>
      {elementsCoordinates.map((item, index) => {
        return <Canvas key={index} {...item} />;
      })}
    </div>
  );
}
