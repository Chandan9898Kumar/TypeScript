import { memo } from "react";
import styles from "./button.module.css";

type buttonType = "button" | "submit" | "reset";

interface ButtonWidgetProps {
  onClick: () => void;
  label: string;
  buttonType?: buttonType;
}

const ButtonWidget = ({
  onClick,
  buttonType = "button",
  label,
}: ButtonWidgetProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} type={buttonType} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default memo(ButtonWidget);
