import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import styles from "./otp.module.css";

export default function InputFocusPartTwo() {
  const [inputValue, setInputValue] = useState(["", "", "", ""]);
  const inputFocus = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    indexNumber: number
  ) => {
    const newValue = [...inputValue];
    newValue[indexNumber] = event.target.value;

    if (indexNumber < inputValue.length - 1 && !inputValue[indexNumber]) {
      inputFocus.current[indexNumber + 1]!.focus();
    }
    document.startViewTransition(() => {
      setInputValue(newValue);
    });
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.code === "Backspace" && index && !inputValue[index]) {
      inputFocus.current[index - 1]!.focus();
    }
  };


  return (
    <div>
      <h1>OTP Field</h1>

      <div className={styles.mainTwo}>
        {inputValue.map((value, index) => {
          return (
            <OtpField
              key={index}
              type="text"
              value={value}
              maxLength={1}
              index={index}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              inputRef={inputFocus}
            />
          );
        })}
      </div>
    </div>
  );
}

interface OptFieldProps {
  type: string;
  value: string;
  maxLength: number;
  index: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleKeyDown: (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  inputRef: React.RefObject<(HTMLInputElement | null)[]>;
}

const OtpField = ({
  type,
  value,
  maxLength,
  handleChange,
  handleKeyDown,
  index,
  inputRef,
}: OptFieldProps) => {
  return (
    <div className="main">
      <input
        ref={(event) => (inputRef.current![index] = event)}
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(event) => handleChange(event, index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
      />
    </div>
  );
};
