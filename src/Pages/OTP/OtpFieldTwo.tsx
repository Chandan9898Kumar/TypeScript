import { useState, useRef, ChangeEvent, KeyboardEvent,useCallback,ClipboardEvent } from "react";
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

  const handlePaste = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
    // Prevent default paste behavior
    event.preventDefault();
    
    // Get pasted data and create optimized array in one go
    const pastedData = event.clipboardData
      .getData("text")
      .slice(0, inputValue.length)
      .split("");
      
    // Direct array assignment instead of spread operator
    setInputValue(oldValue => {
      const newFieldValue = new Array(oldValue.length);
      for (let i = 0; i < pastedData.length; i++) {
        newFieldValue[i] = pastedData[i];
      }
      return newFieldValue;
    });
  
    // Focus optimization using requestAnimationFrame
    requestAnimationFrame(() => {
      inputFocus.current[inputValue.length - 1]?.focus();
    });
  }, [inputValue]);
  

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
              handlePaste={handlePaste}
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
  handlePaste:(event:ClipboardEvent<HTMLInputElement>)=>void,
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
  handlePaste
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
        onPaste={handlePaste}
      />
    </div>
  );
};


/*
Let me explain how requestAnimationFrame (rAF) works:

Core Purpose :
It's a browser API that synchronizes your JavaScript code execution with the browser's natural refresh rate (typically 60fps) [2]
Helps create smoother animations by executing code at the optimal time before the next screen repaint



Key Benefits :
  Automatically matches monitor's refresh rate (usually 60Hz = every 16.7ms)
  Pauses when tab is inactive, saving CPU/battery
  Better performance than setInterval/setTimeout
  Prevents visual artifacts and screen tearing


Here, it's used to:
  Ensure the focus operation happens at the optimal time
  Prevent potential visual glitches during DOM updates
  Handle focus change smoothly after state updates
  Browser Optimization :
  Browser optimizes multiple rAF calls into a single reflow/repaint
  Automatically adjusts timing based on system performance
  Reduces CPU usage when page is in background
*/