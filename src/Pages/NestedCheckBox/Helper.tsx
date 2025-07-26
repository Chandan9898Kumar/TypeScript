/**
 * The above functions are used to update the checked status of nodes in a tree data structure in
 * TypeScript React.
 * @param {Tree} node - The `node` parameter in the `updateDescendants` function represents a single
 * node in a tree data structure. It has properties like `checked` to indicate if the node is selected,
 * and `children` which is an array of child nodes. The function recursively updates the `checked`
 * property of
 * @param {boolean} check - The `check` parameter in the `updateDescendants` function is a boolean
 * value that determines whether the descendants of a node should be checked or unchecked. It is used
 * to update the `checked` property of the nodes in the tree structure.
 * @returns The code snippet provided contains several functions related to updating and checking nodes
 * in a tree data structure. Here is a summary of what each function does:
 */
import Tree from "./Schema";

export const updateDescendants = (node: Tree, check: boolean): Tree => {
  return {
    ...node,
    checked: check,
    children: node.children.map((node) => updateDescendants(node, check)),
  };
};

export const setChecked = (
  tree: Tree[],
  id: string,
  check: boolean
): Tree[] => {
  return tree?.map((nodeItem) => {
    if (nodeItem.id === id) {
      return updateDescendants(nodeItem, check);
    }

    if (nodeItem.children.length) {
      return {
        ...nodeItem,
        children: setChecked(nodeItem.children, id, check),
      };
    }
    return nodeItem;
  });
};

export const areAllChildrenChecked = (nodeChild: Tree[]): boolean => {
  return nodeChild.every(
    (nodes) => nodes.checked && areAllChildrenChecked(nodes.children)
  );
};

export const updateAncestors = (nodeTree: Tree[]) => {
  function updateNodeCheckStatus(node: Tree[]): Tree[] {
    return node?.map((nodes) => {
      if (nodes.children.length) {
        const updatedChildren = updateNodeCheckStatus(nodes.children);

        const allChildrenChecked = areAllChildrenChecked(updatedChildren);

        return {
          ...nodes,
          checked: allChildrenChecked,
          children: updatedChildren,
        };
      }

      return nodes;
    });
  }

  return updateNodeCheckStatus(nodeTree);
};
