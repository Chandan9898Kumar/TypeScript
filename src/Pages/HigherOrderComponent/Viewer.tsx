
import WithRole from "./HigherOrderComponent";
  const ViewerPanel = () => {
    return <div>Welcome to the Viewer Dashboard!</div>;
  };

  const ViewerDashboard = WithRole(ViewerPanel, "viewer");

  export default ViewerDashboard;