import Tree from "./Schema";

export const treeData: Tree[] = [
  {
    id: "1",
    label: "Parent",
    checked: false,
    children: [
      { id: "1-1", label: "Child 1", checked: false, children: [] },
      {
        id: "1-2",
        label: "Child 2",
        checked: false,
        children: [
          { id: "1-2-1", label: "Grandchild", checked: false, children: [] },
        ],
      },
    ],
  },
];
