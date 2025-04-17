import { memo } from "react";
import styles from "./swap.module.css";
interface ButtonProps {
  label: string;
  onClick: () => void;
  isConditionTrue: boolean;
}
const Button = ({ label = "Click", onClick, isConditionTrue }: ButtonProps) => {
  return (
    <button className={styles.button} type="button" onClick={onClick} disabled={isConditionTrue}>
      {label}
    </button>
  );
};

export default memo(Button);
