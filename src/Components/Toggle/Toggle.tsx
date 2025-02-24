import { useState, FC } from "react";
import styles from "./toggle.module.css";
import { ContextManager } from "../../Context/ThemeManager";
import ToastBar from "../../Pages/Toast/ToastBar";
const Toggle: FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const { isThemeDark, setIsThemeDark } = ContextManager();

  const handleToggle = (): void => {
    setIsToggled(!isToggled);
    setIsThemeDark(!isThemeDark);
    setToast(true);
  };

  return (
    <div className={styles.container} data-toggled={isToggled}>
      <div
        className={styles.toggle}
        onClick={handleToggle}
        role="button"
        aria-label="toggle button"
      ></div>
      {toast && (
        <ToastBar
          message={`${isToggled ? "Dark Theme" : "Light Theme"}`}
          type="success"
          position="bottom-left"
          duration={3000}
          onClose={() => setToast(false)}
          showIcon={true}
        />
      )}
    </div>
  );
};

export default Toggle;
