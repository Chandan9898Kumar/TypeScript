import { useState } from "react";
import styles from "./stepper.module.css";
import {
  Component1,
  Component2,
  Component3,
  Component4,
  Component5,
} from "./Components";

const Components = [Component1, Component2, Component3, Component4, Component5];

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
      <div className={styles.stepper}>
        {steps.map((item, index) => {
          return (
            <div className={styles.main} key={item}>
              <div data-item={index <= activeStepper} className={styles.ids}>
                <span>{index + 1}</span>
              </div>
              <div className={styles.item}>{item}</div>
            </div>
          );
        })}
        <div className={styles.bar}>
          <div
            className={styles.progress}
            style={{ width: `${(activeStepper / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.products}>{Components[activeStepper]()}</div>

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
