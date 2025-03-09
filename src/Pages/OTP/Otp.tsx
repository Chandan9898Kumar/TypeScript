import { useRef } from "react";
import styles from "./otp.module.css";
const TOTAL_FIELD = 4;
const Otp = () => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputEvent = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.code === "Space" && index + 1 < inputRef.current.length) {
      event.preventDefault();
      inputRef.current[index + 1]?.focus();
    } else if (event.code === "Backspace" && index - 1 >= 0) {
      if (inputRef.current[index]) {
        inputRef.current[index].value = "";
      }
      inputRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    const splitData = pasteData.split("").slice(0, inputRef.current.length);

    for (let x = 0; x < inputRef.current.length; x++) {
      if (inputRef.current[x]) {
        // The ! in inputRef.current[x]!.value is the TypeScript non-null assertion operator.
        // You're telling TypeScript "I guarantee this value won't be null or undefined, trust me" .Skip the null and undefined checks
        inputRef.current[x]!.value = splitData[x];
      }
    }
    inputRef.current[splitData.length - 1]?.focus();
  };
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

/**
 Above we have used Event.preventDefault()  because:

When you type any character (including space) in an input field, two things happen by default: [2]

1. The browser captures the keypress event
2. The browser then adds that character to the input field
3. event.preventDefault() stops the browser's default behavior from occurring. In this case, it prevents the space character from being added to the input field. [3]

1. Without preventDefault():

if (event.code === "Space") {
    inputRef.current[index + 1]?.focus();
    // Space character still gets entered in current field
    // AND gets carried over to the next field
}

> What happens:

1. User presses space
2. Space gets added to current input
3. Focus moves to next input
4. The space is still in the system buffer and gets added to the next input. 


2. With preventDefault():
if (event.code === "Space") {
    event.preventDefault(); // Stops space from being entered
    inputRef.current[index + 1]?.focus();
    return;
}

What happens:

1. User presses space
2. preventDefault() stops the space from being added
3. Focus moves to next input
4. No space character is carried over
 */
