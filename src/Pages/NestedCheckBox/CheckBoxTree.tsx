import { useCallback, useState } from "react";
import { setChecked, updateAncestors } from "./Helper";
import RenderNodes from "./RenderTree";
import Tree from "./Schema";
interface CheckBoxTreeProps {
  treeData: Tree[];
}

type Expand = Record<string, boolean>;

//              OR 
// interface Expand {
//   [key: string]: boolean;
// }

const CheckBoxTree = ({ treeData }: CheckBoxTreeProps) => {
  const [trees, setTress] = useState<Tree[]>(treeData);
  const [expanded, setExpanded] = useState<Expand>({});

  const handleExpand = (id: string) => {
    setExpanded((exp) => ({ ...exp, [id]: !exp[id] }));
  };

  const handleCheck = useCallback((id: string, check: boolean) => {
      const newTree = setChecked(trees, id, check);
      const updatedTree = updateAncestors(newTree);
      setTress(updatedTree);
    },
    [trees]
  );
  return (
    <div>
      {trees.map((nodes) => (
        <RenderNodes
          key={nodes.id}
          node={nodes}
          handleCheck={handleCheck}
          expanded={expanded}
          handleExpand={handleExpand}
        />
      ))}
    </div>
  );
};

export default CheckBoxTree;
