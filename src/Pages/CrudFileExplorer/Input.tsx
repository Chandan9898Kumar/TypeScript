import { useState } from "react";
import useOutsideClick from "../../Hooks/useClickOutside";
import { v4 as uuidv4 } from "uuid";

import styles from "./crud.module.css";

interface Elements {
  id: string | number;
  name: string;
  isFolder: boolean;
  children?: Elements[];
}

interface InputProps {
  fileType: string;
  folderId: number | string;
  setFileType: (type: string) => void;
  handleSetFileType: (element: Elements, id: number | string) => void;
}

const Input = ({
  fileType = "",
  folderId,
  setFileType,
  handleSetFileType,
}: InputProps) => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const handleClickOutside = () => {
    setFileType("");
  };
  const ref = useOutsideClick(handleClickOutside);

  const handleSet = () => {
    if (value.trim() === "") {
      return;
    }
    if (fileType === "file" && !value.includes(".")) {
      setMessage("File should have . syntax");
      return;
    }
    const element: Elements = {
      id: uuidv4(),
      name: value,
      isFolder: fileType === "folder",
    };

    if (fileType === "file") {
      handleSetFileType(element, folderId);
    } else {
      element.children = [];
      handleSetFileType(element, folderId);
    }
    setFileType("");
    setValue("");
    setMessage("");
  };

  return (
    <div className={styles.inputFiled} ref={ref}>
      {fileType === "file" ? "📄" : "📁"}{" "}
      <input
        type="text"
        value={value}
        placeholder={fileType === "file" ? "Enter File" : "Enter Folder"}
        onChange={(event) => setValue(event.target.value)}
      />
      {"  "}
      <button
        className={styles.btn}
        aria-label="set-file-Folder"
        onClick={handleSet}
      >
        ➡️
      </button>
      <div>{message && <span className={styles.message}>{message}</span>}</div>
    </div>
  );
};

export default Input;
