import { memo, useState } from "react";
import styles from "./graph.module.css";

interface ChartData {
  id: string;
  name: string;
  ticketCount: number;
  colour: string;
}

const CHART_DATA: ChartData[] = [
  { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4E5452" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#642424" },
  { id: "dep-6", name: "Human Resourcing", ticketCount: 35, colour: "#1D1E33" },
  { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" },
];

// Reusable Tooltip component
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    setPosition({ x: e.clientX, y: e.clientY - 40 });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY - 40 });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ position: "relative" }}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "14px",
            zIndex: 1000,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// Calculate max ticket count once
const MAX_TICKET_COUNT = Math.max(
  ...CHART_DATA.map((item) => item.ticketCount)
);

export default function Graph() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Bar Graph</h1>
      <ChartBar data={CHART_DATA} />
    </div>
  );
}

interface ChartBarProps {
  data: ChartData[];
}

const ChartBar = memo(({ data }: ChartBarProps) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.yAxis}>Number of tickets</div>
        <div className={styles.chart}>
          {data.map((item) => {
            return (
              <Bars
                key={item.id}
                count={item.ticketCount}
                colour={item.colour}
                name={item.name}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.dep}>Departments</div>
    </>
  );
});

interface BarsProps {
  count: number;
  colour: string;
  name: string;
}
// const Bars = memo(({ count, colour }: BarsProps) => {
// Pre-calculate the height once
//   const barHeight = `${(150 / MAX_TICKET_COUNT) * count}px`;

//   const style = {
//     backgroundColor: colour,
//     "--to-height": barHeight,
//     "--from-height": "0px",
//     height: `${barHeight}px`, // Set explicit height to avoid layout calculation during animation
//     transform: "translateZ(0)", // Force GPU acceleration
//   } as React.CSSProperties;

//   return <div className={styles.bars} style={style}></div>;
// });

const Bars = memo(({ count, colour, name }: BarsProps) => {
  // Calculate scale factor
  const scaleY = count / MAX_TICKET_COUNT;
  const style = {
    backgroundColor: colour,
    "--scale-y": scaleY,
    transformOrigin: "bottom",
  } as React.CSSProperties;

  return (
    <Tooltip
      content={
        <div>
          {name}: {count} tickets
        </div>
      }
    >
      <div className={styles.bars} style={style}></div>
    </Tooltip>
  );
});
