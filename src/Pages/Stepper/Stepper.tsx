import { useState } from "react";
import styles from "./stepper.module.css";
import {
  Component1,
  Component2,
  Component3,
  Component4,
  Component5,
} from "./Components";

const Components = [
  Component1,
  Component2,
  Component3,
  Component4,
  Component5,
]

const steps = [
  "first Step",
  "second Step",
  "third Step",
  "fourth Step",
  "fifth Step",
];
steps.length = Components.length;

const Stepper = () => {
  const [activeStepper, setActiveStepper] = useState<number>(0);

  const handleNext = (): void => {
    setActiveStepper(Math.min(steps.length, activeStepper + 1));
  };

  const handleBack = (): void => {
    setActiveStepper(Math.max(0, activeStepper - 1));
  };

  return (
    <section className={styles.container}>
      <ul>
        {steps.map((step, index) => {
          return (
            <li key={index}>
              <p
                className={styles.itemIndex}
                data-step={index <= activeStepper}
              >
                {index + 1}
              </p>
              <p className={styles.itemText}>{step}</p>
            </li>
          );
        })}
      </ul>

      <div className={styles.products}>
        {Components[activeStepper]()}
      </div>

      <div className={styles.btns}>
        <button
          type="button"
          aria-label="back button"
          onClick={handleBack}
          disabled={!activeStepper}
        >
          Back
        </button>
        <button
          aria-label="next button"
          type="button"
          onClick={handleNext}
          disabled={activeStepper + 1 === steps.length}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Stepper;
