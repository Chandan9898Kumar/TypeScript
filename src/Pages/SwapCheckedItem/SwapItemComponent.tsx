import { useState, useCallback, ChangeEvent } from "react";
import styles from "./swap.module.css";
import CheckBoxList from "./CheckBox";
import Button from "./Button";

interface dataProps {
  id: number;
  value: number;
  isChecked: boolean;
}

export default function SwapComponent() {
  const [primaryData, setPrimaryData] = useState<dataProps[]>([
    { id: 1, value: 1, isChecked: false },
    { id: 2, value: 2, isChecked: false },
  ]);

  const [secData, setSecData] = useState<dataProps[]>([
    { id: 3, value: 3, isChecked: false },
    { id: 4, value: 4, isChecked: false },
  ]);

  const handlePrimaryClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const id = parseInt((event.target as HTMLInputElement).dataset.id!);
      setPrimaryData(
        primaryData.map((item) =>
          item.id === id ? { ...item, isChecked: !item.isChecked } : item
        )
      );
    },
    [primaryData]
  );

  const handleSecClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const id = parseInt((event.target as HTMLInputElement).dataset.id!);

      setSecData(
        secData.map((item) =>
          item.id === id ? { ...item, isChecked: !item.isChecked } : item
        )
      );
    },
    [secData]
  );

  const isPrimaryEnabled = primaryData?.length
    ? primaryData.every((item) => !item.isChecked)
    : true;

  const isSecEnabled = secData?.length
    ? secData.every((item) => !item.isChecked)
    : true;

  const handlePrimaryCheck = useCallback(() => {
    const checkedItems = primaryData.filter((item) => item.isChecked);

    const unCheckedItems = primaryData.filter((item) => !item.isChecked);

    setPrimaryData(unCheckedItems);

    setSecData((prevValue) => [...prevValue, ...checkedItems]);
  }, [primaryData]);

  const handleSecCheck = useCallback(() => {
    const checkedItems = secData.filter((item) => item.isChecked);
    const unCheckedItems = secData.filter((item) => !item.isChecked);
    setSecData(unCheckedItems);
    setPrimaryData((prevValue) => [...prevValue, ...checkedItems]);
  }, [secData]);

  return (
    <div className={styles.container}>
      <h1>Swap Check Box Items</h1>
      <div className={styles.parent}>
        <div className={styles.slideIn}>
          <CheckBoxList
            key="prime"
            label="Primary"
            data={primaryData}
            onChange={handlePrimaryClick}
          />
        </div>
        <div className={styles.slideIn}>
          <CheckBoxList
            key="sec"
            label="secondary"
            data={secData}
            onChange={handleSecClick}
          />
        </div>
      </div>

      <div className={`${styles.parent} ${styles.fadeIn}`}>
        <Button
          key="btn1"
          label="Transfer Right"
          isConditionTrue={isPrimaryEnabled}
          onClick={handlePrimaryCheck}
        />
        <Button
          key="btn2"
          label="Transfer Left"
          isConditionTrue={isSecEnabled}
          onClick={handleSecCheck}
        />
      </div>
    </div>
  );
}
