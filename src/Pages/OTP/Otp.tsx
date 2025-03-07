import { useRef } from "react";
import styles from "./otp.module.css";
const TOTAL_FIELD = 4;
const Otp = () => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <section>
      <div className={styles.main}>
        {[...Array(TOTAL_FIELD)].fill("").map((_, index) => {
          return (
            <input
              ref={(element) => (inputRef.current[index] = element)}
              key={index}
              type="text"
              maxLength={1}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Otp;
