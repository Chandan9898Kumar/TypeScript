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
