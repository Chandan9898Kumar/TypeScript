import { useState, FC } from "react";
import styles from "./toggle.module.css";
import { ContextManager } from "../../Context/ThemeManager";
const Toggle: FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const { isThemeDark, setIsThemeDark } = ContextManager();

  const handleToggle = (): void => {
    setIsToggled(!isToggled);
    setIsThemeDark(!isThemeDark);
  };

  return (
    <div className={styles.container}  data-toggled={isToggled}>
      <div
        className={styles.toggle}
        onClick={handleToggle}
        role="button"
        aria-label="toggle button"
      ></div>
    </div>
  );
};

export default Toggle;
