import AdminDashboard from "./Admin";
import EditorDashboard from "./Editor";
import ViewerDashboard from "./Viewer";

const HigherOrderDashBoard = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Higher Order Component</h1>
      <AdminDashboard role='admin' />
      <EditorDashboard role='editor'/>
      <ViewerDashboard role='viewer' />
    </div>
  );
};

export default HigherOrderDashBoard;
