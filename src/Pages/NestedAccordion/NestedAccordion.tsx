import { useState } from "react";
import "./nestedAccordion.css";

interface DataItem {
  id: number;
  name: string;
  parentId: number | null;
  children?: DataItem[];
}

const arr: DataItem[] = [
  { id: 1, name: "parent 1", parentId: null },
  { id: 2, name: "child 1.1", parentId: 1 },
  { id: 3, name: "child 1.2", parentId: 1 },
  { id: 4, name: "parent 2", parentId: null },
  { id: 5, name: "child 2.1", parentId: 4 },
];

const newarr = arr
  .map((item, _, Arr) => {
    if (item.parentId === null) {
      const child = Arr.filter((items) => item.id === items.parentId);
      item.children = child;
    }
    return item;
  })
  .filter((item) => !item.parentId);

export default function NestedAccordionApp() {
  return (
    <div>
      <h1>Nested Accordion</h1>

      <ul className="ul-container">
        {newarr.map((item) => {
          return (
            <li key={item.id}>
              <NestedAccordion data={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const NestedAccordion: React.FC<{ data: DataItem }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      className={`${data.children ? "container" : ""}`}
    >
      {data.name}
      {isOpen && (
        <div className="child">
          {data.children &&
            data.children.length &&
            data.children.map((item) => {
              return <NestedAccordion key={item.id} data={item} />;
            })}
        </div>
      )}
    </div>
  );
};
