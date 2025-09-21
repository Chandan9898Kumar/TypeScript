import { useState } from "react";

const Arrays = Array.from({ length: 20 }, (_, i) => i + 1);

interface VirtualizationProps {
  data: number[];
  contentHeight?: number;
  heightPerItem?: number;
  buffer?: number;
  handleincrement: () => void;
}

const Virtualization = ({
  data,
  contentHeight = 300,
  heightPerItem = 30,
  buffer = 5,
  handleincrement,
}: VirtualizationProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    Math.ceil(contentHeight / heightPerItem) + buffer
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const newStartIndex = Math.floor(scrollTop / heightPerItem);

    // ✅ Calculate visible items count, not cumulative endIndex
    const visibleItemsCount = Math.ceil(clientHeight / heightPerItem) + buffer;
    const newEndIndex = newStartIndex + visibleItemsCount;

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);

    const isViewPortReached = scrollTop + clientHeight >= scrollHeight - 10;
    if (isViewPortReached) {
      handleincrement();
    }
  };

  const visibleData = data.slice(startIndex, endIndex);

  console.log(startIndex, endIndex, visibleData, visibleData.length);
  return (
    <div
      style={{
        background: "red",
        height: `${contentHeight}px`,
        width: "300px",
        overflow: "auto",
        borderRadius: "10px",
        textAlign: "center",
        contain: "layout style paint", // Browser optimization
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      {visibleData.map((item: number, idx: number) => {
        return (
          <div
            key={item}
            style={{
              height: `${heightPerItem}px`,
              position: "absolute",
              top: (startIndex + idx) * heightPerItem,
              width: "100%",
              textAlign: "center",
              borderBottom: "1px solid gray",
              boxSizing: "border-box",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

const VirtualList = () => {
  const [data, setData] = useState<number[]>(Arrays);

  const handleIncrement = () => {
    const lastData = data[data.length - 1];
    const newData = Array.from({ length: 40 }, (_, i) => lastData + i + 1);
    setData((prevData) => [...prevData, ...newData]);
  };

  return (
    <div
      style={{
        background: "pink",
        height: "100lvh",
        padding: "0",
        margin: "0",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: "5px",
      }}
    >
      <h1
        style={{
          color: "gray",
          textAlign: "center",
          padding: "10px",
          margin: "0",
        }}
      >
        Virtualization
      </h1>

      <Virtualization data={data} handleincrement={handleIncrement} />
    </div>
  );
};

export default VirtualList;
