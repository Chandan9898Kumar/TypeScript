import { memo, useState } from "react";
import styles from './tool.module.css'

interface ToolTipProps {
  content: React.ReactNode;
  children: React.ReactElement;
}

const ToolTip = memo(({ content, children }: ToolTipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tool}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className={styles.tip}>{content}</div>}
    </div>
  );
});

export default ToolTip;
