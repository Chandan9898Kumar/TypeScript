import { ChangeEvent, memo } from "react";
import styles from "./tab.module.css";

interface PublicData {
  id: number;
  name: string;
  placeholder: string;
  value: string;
  type: string;
}

interface PublicProps {
  data: PublicData[];
  changeFunction: (id: number, event: ChangeEvent<HTMLInputElement>) => void;
}

const Public = ({ data, changeFunction }: PublicProps) => {
  return (
    <div className={styles.form_container}>
      {data.map((item, index) => {
        return (
          <div key={item.id} className={styles.form_group}>
            <label className={styles.form_label}>
              <span className={styles.label_text}>
                {item.name.toUpperCase()} {"  "}:
              </span>
              <input
                className={styles.form_input}
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                value={item.value}
                onChange={(event) => changeFunction(index, event)}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Public);
