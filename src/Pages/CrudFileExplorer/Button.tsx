import styles from "./crud.module.css";

interface ButtonProps {
  setFileType: (type: string) => void;
}

const Button = ({ setFileType }: ButtonProps) => {
  return (
    <div className={styles.fileFolderButton}>
      <button
        title="file"
        className={styles.btn}
        aria-label="file-button"
        onClick={() => setFileType("file")}
      >
        📄
      </button>
      <button
        onClick={() => setFileType("folder")}
        title="folder"
        className={styles.btn}
        aria-label="folder-button"
      >
        📁
      </button>
    </div>
  );
};

export default Button;
