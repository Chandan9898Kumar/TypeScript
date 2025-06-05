import { memo } from "react";

type buttonType = "button" | "submit" | "reset";

interface ButtonWidgetProps {
  onClick: () => void;
  label: string;
  buttonType?: buttonType;
}

const ButtonWidget = ({
  onClick,
  buttonType = "button",
  label,
}: ButtonWidgetProps) => {

  return (
    <div>
      <button type={buttonType} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default memo(ButtonWidget);
