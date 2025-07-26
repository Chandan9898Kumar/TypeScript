import CheckBoxTree from "./CheckBoxTree";
import { treeData } from "./Data";

const NestedCheckBox = () => {
  return (
    <>
      <h1>Nested Check Box</h1>
      <CheckBoxTree treeData={treeData} />
    </>
  );
};

export default NestedCheckBox;




//                                        Second way
// import React, { useState } from 'react';
// import './style.css';

// const treeData = [
//   {
//     id: '1',
//     label: 'Parent',
//     checked: false,
//     children: [
//       { id: '1-1', label: 'Child 1', checked: false, children: [] },
//       {
//         id: '1-2',
//         label: 'Child 2',
//         checked: false,
//         children: [
//           { id: '1-2-1', label: 'Grandchild', checked: false, children: [] },
//           { id: '1-2-2', label: 'Grandchild 2', checked: false, children: [] },
//         ],
//       },
//     ],
//   },
// ];

// function updateDescendants(node, checked) {
//   // Recursively set all children to `checked`
//   return {
//     ...node,
//     checked,
//     children: node.children.map((child) => updateDescendants(child, checked)),
//   };
// }

// function areAllChildrenChecked(children) {
//   return children.every(
//     (child) => child.checked && areAllChildrenChecked(child.children)
//   );
// }

// function areSomeChildrenChecked(children) {
//   return children.some(
//     (child) => child.checked || areSomeChildrenChecked(child.children)
//   );
// }

// /**
//  * Updates the "checked" status of parent nodes in a tree
//  * based on the checked status of their children.
//  *
//  * @param {Array} tree - The full array of tree nodes.
//  * @param {string|number} id - The ID of the node that was updated (currently unused here).
//  * @returns {Array} - A new tree with updated 'checked' statuses for parent nodes.
//  */
// function updateAncestors(tree, id) {
//   /**
//    * Recursively walks through nodes and updates parent nodes' 'checked'
//    * status to true only if all children are checked.
//    *
//    * @param {Array} nodes - An array of tree nodes.
//    * @returns {Array} - Updated nodes with correct 'checked' values.
//    */
//   function updateNodeCheckStatus(nodes) {
//     return nodes.map((node) => {
//       if (node.children?.length > 0) {
//         // Recursively process children
//         const updatedChildren = updateNodeCheckStatus(node.children);

//         // Determine if all children are checked
//         const allChildrenChecked = areAllChildrenChecked(updatedChildren);
    
//         // Return updated node with recalculated 'checked' and updated children
//         return {
//           ...node,
//           checked: allChildrenChecked,
//           children: updatedChildren,
//         };
//       }

//       // Leaf node: return as is (no update to 'checked' logic here)
//       return node;
//     });
//   }

//   // Start recursive update from the root of the tree
//   return updateNodeCheckStatus(tree);
// }

// function setChecked(tree, id, checked) {
//   // Toggle checkbox and cascade
//   function helper(nodes) {
//     return nodes.map((node) => {
//       if (node.id === id) {
//         let child = updateDescendants(node, checked);

//         return child;
//       }
//       if (node.children.length) {
//         return { ...node, children: helper(node.children) };
//       }
//       return node;
//     });
//   }
//   return helper(tree);
// }

// const FolderTree = ({ data }) => {
//   const [tree, setTree] = useState(data || treeData);
//   const [expanded, setExpanded] = useState({});
//   const [activeId, setActiveId] = useState(null);

//   const handleCheck = (id, checked) => {
//     let newTree = setChecked(tree, id, checked);

//     newTree = updateAncestors(newTree, id);
//     setTree(newTree);
//   };

//   const toggleExpand = (id) => {
//     setExpanded((exp) => ({ ...exp, [id]: !exp[id] }));
//   };

//   const renderNode = (node, level = 0) => {
//     const isExpanded = expanded[node.id];
//     const allChecked = areAllChildrenChecked(node.children);
//     const someChecked =
//       node.children.length &&
//       !allChecked &&
//       areSomeChildrenChecked(node.children);


//   console.log(expanded,'expanded')
//     return (
//       <div
//         key={node.id}
//         className={`tree-row ${activeId === node.id ? 'active' : ''}`}
//         style={{ paddingLeft: 20 * level }}
//         onMouseEnter={() => setActiveId(node.id)}
//         onMouseLeave={() => setActiveId(null)}
//       >
//         {node.children.length > 0 && (
//           <span
//             className="expander"
//             onClick={() => toggleExpand(node.id)}
//             style={{ cursor: 'pointer', marginRight: 6 }}
//           >
//             {isExpanded ? '▼' : '▶'}
//           </span>
//         )}
//         <input
//           type="checkbox"
//           checked={node.checked}
//           indeterminate={someChecked ? 'indeterminate' : undefined}
//           onChange={(e) => handleCheck(node.id, e.target.checked)}
//         />
//         <span className="label">{node.label}</span>
//         {node.children.length > 0 && isExpanded && (
//           <div>
//             {node.children.map((child) => renderNode(child, level + 1))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return <div className="tree">{tree.map((node) => renderNode(node))}</div>;
// };

// export default FolderTree;
