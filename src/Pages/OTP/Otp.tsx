import { useRef } from "react";
import styles from "./otp.module.css";
const TOTAL_FIELD = 4;
const Otp = () => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputEvent = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // console.log(event, "event",index);

    if (event.code === "Space" && index + 1 < inputRef.current.length) {
      inputRef.current[index + 1]?.focus();
    } else if (event.code === "Backspace" && index - 1 >= 0) {
      if (inputRef.current[index]) {
        inputRef.current[index]!.value = "";
      }
      inputRef.current[index - 1]?.focus();
    }
  };

const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
  console.log(event, 'event paste', event.clipboardData.getData('text'));
}
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
              onInput={(event) => {
                if ((event.target as HTMLInputElement).value.trim()) {
                  inputRef.current[index + 1]?.focus();
                }
              }}
              onKeyDown={(event) => {
                handleInputEvent(event, index);
              }}
              onPaste={handlePaste}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Otp;
