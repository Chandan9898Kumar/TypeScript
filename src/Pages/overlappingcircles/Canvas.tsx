import styles from "./circle.module.css";

interface CanvasProps {
  x: number;
  y: number;
  background: string;
  size: number;
}

const Canvas = ({ x, y, background, size }: CanvasProps) => {
  return (
    <div
      className={styles.canvas}
      style={{
        top: y,
        left: x,
        background,
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
};
export default Canvas;
