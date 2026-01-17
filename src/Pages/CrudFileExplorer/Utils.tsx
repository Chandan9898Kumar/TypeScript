import { FileNode } from "./Schema";

export const addChildToFolder = (
  files: FileNode[],
  child: FileNode,
  id: string | number,
): FileNode[] => {
  return files.map((item) => {
    if (item.id === id) {
      return { ...item, children: [...(item.children || []), child] };
    }

    if (item.id !== id && item.children && item.children.length) {
      const newChildren = addChildToFolder(item.children, child, id);
      return { ...item, children: newChildren };
    }
    return item;
  });
};

export function deleteItemFromFolder(
  data: FileNode[],
  id: number | string,
): FileNode[] {
  for (const x of data) {
    if (x.id === id) {
      const index = data.indexOf(x);
      data.splice(index, 1);
    }

    if (x.children && x.children.length) {
      deleteItemFromFolder(x.children, id);
    }
  }

  return data;
}
