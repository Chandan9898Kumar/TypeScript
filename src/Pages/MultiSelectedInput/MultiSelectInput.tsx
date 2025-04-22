import { useState, useCallback, ChangeEvent, memo, KeyboardEvent } from "react";
import styles from "./chip.module.css";

export default function MultiSelectChip() {
  const [chipItem, setChipItem] = useState<(number | string)[]>([1, 2]);
  const [inputField, setInputField] = useState<string>("");

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputField(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (
        inputField.trim() === "" &&
        event.key === "Backspace" &&
        chipItem.length
      ) {
        const newItem = [...chipItem];
        newItem.pop();
        setChipItem(newItem);
      }
      if (event.key === "Enter" && inputField.trim()) {
        document.startViewTransition(() => {
          setChipItem((prev) => [...prev, inputField]);
          setInputField("");
        });
      }
    },
    [chipItem, inputField]
  );

  const handleClick = useCallback((item: string | number) => {
    setChipItem((prev) => prev.filter((items) => items !== item));
  }, []);

  return (
    <div>
      <h1>Multi Select input Chip</h1>

      <div className={styles.container}>
        <MemoizedChipBox chipItem={chipItem} handleClick={handleClick} />

        <MemoizedInputField
          inputField={inputField}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

interface ChipBoxProps {
  chipItem: (number | string)[];
  handleClick: (item: number | string) => void;
}

const ChipBox = ({ chipItem, handleClick }: ChipBoxProps) => {
  return (
    <>
      {chipItem.map((item) => {
        return (
          <div key={item} className={styles.btn}>
            <p>{item}</p>{" "}
            <button onClick={() => handleClick(item)}>{"X"}</button>
          </div>
        );
      })}
    </>
  );
};

interface InputFieldProps {
  inputField: string | number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const InputFiled = ({
  inputField,
  handleChange,
  handleKeyDown,
}: InputFieldProps) => {
  return (
    <>
      <input
        className={styles.inputField}
        id="inputField"
        autoFocus
        type="text"
        placeholder="Type your Query"
        value={inputField}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

const MemoizedChipBox = memo(ChipBox);
const MemoizedInputField = memo(InputFiled);
