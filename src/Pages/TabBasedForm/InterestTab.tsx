import { memo } from "react";
import styles from "./tab.module.css";

interface InterestData {
  id: number;
  name: string;
  checked: boolean;
  type: string;
}

interface InterestProps {
  data: InterestData[];
  changeFunction: (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const Interest = ({ data = [], changeFunction = () => {} }: InterestProps) => {
  return (
    <div className={styles.interest_container}>
      {data?.map((checkbox) => (
        <div key={checkbox.id} className={styles.checkbox_group}>
          <label className={styles.checkbox_label}>
            <input
              className={styles.checkbox_input}
              type="checkbox"
              checked={checkbox.checked}
              onChange={(event) => changeFunction(checkbox.id, event)}
            />
            <span className="checkbox-text">{checkbox.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default memo(Interest);
