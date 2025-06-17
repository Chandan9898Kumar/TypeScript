export interface FileNode {
  id: number;
  name: string;
  isFolder: boolean;
  children?: FileNode[];
}

export const fileData: FileNode[] = [
  {
    id: 1,
    name: "src",
    isFolder: true,
    children: [
      { id: 2, name: "App.js", isFolder: false },
      { id: 3, name: "index.js", isFolder: false },
      {
        id: 4,
        name: "components",
        isFolder: true,
        children: [
          { id: 5, name: "Header.js", isFolder: false },
          { id: 6, name: "Footer.js", isFolder: false },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "public",
    isFolder: true,
    children: [
      { id: 8, name: "index.html", isFolder: false },
      { id: 9, name: "favicon.ico", isFolder: false },
    ],
  },
];
