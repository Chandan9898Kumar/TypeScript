import { useState, FC } from "react";
import styles from "./toggle.module.css";

const Toggle: FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={styles.container}>
      <div
        style={{ position: isToggled ? "absolute" : undefined }}
        className={styles.toggle}
        onClick={handleToggle}
        role="button"
        aria-label="toggle button"
      ></div>
    </div>
  );
};

export default Toggle;
