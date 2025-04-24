import styles from "./tab.module.css";

interface TabButtonProps {
  activeTab: number;
  totalTabLength: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TabButton = ({
  activeTab,
  totalTabLength,
  onClick = () => {},
}: TabButtonProps) => {
  const isSubmitTrue = activeTab === totalTabLength - 1;

  if (activeTab === 0) {
    return (
      <div className={styles.btns}>
        <button value="Next" onClick={onClick}>
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.btns}>
        <button value="Prev" onClick={onClick}>
          Prev
        </button>
        <button value={isSubmitTrue ? "Submit" : "Next"} onClick={onClick}>
          {isSubmitTrue ? "Submit" : "Next"}
        </button>
      </div>
    );
  }
};

export default TabButton;
