import { ChangeEvent, memo } from "react";
import styles from "./swap.module.css";

interface dataProps {
  id: number;
  value: number;
  isChecked: boolean;
}

interface HeaderProps {
  label: string;
}
const Header = ({ label = "" }: HeaderProps) => {
  return <h1>{label}</h1>;
};

interface CheckBoxListProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  data: dataProps[];
}
const CheckBoxList = ({
  label = "",
  data = [],
  onChange,
}: CheckBoxListProps) => {
  return (
    <div className={styles.container}>
      <Header label={label} />
      <div className={styles.check}>
        {!!data?.length &&
          data.map((item) => {
            return <CheckBox key={item.id} item={item} onChange={onChange} />;
          })}
      </div>
    </div>
  );
};

export default memo(CheckBoxList);

interface CheckBoxProps {
  item: dataProps;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const CheckBox = ({ item, onChange }: CheckBoxProps) => {
  return (
    <div key={item.id}>
      <input
        data-id={item.id}
        type="checkbox"
        checked={item.isChecked}
        onChange={onChange}
      />
      {"  "}
      {item.value}
    </div>
  );
};
