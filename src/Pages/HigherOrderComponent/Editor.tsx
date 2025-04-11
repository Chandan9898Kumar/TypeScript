import WithRole from "./HigherOrderComponent";
const EditorPanel = () => {
  return <div>Welcome to the Editor Dashboard!</div>;
};

const EditorDashboard = WithRole(EditorPanel, "editor");

export default EditorDashboard;
