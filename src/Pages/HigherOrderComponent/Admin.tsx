import WithRole from "./HigherOrderComponent";

const AdminPanel = () => {
  return <div>Welcome to the Admin Panel!</div>;
};

const AdminDashboard = WithRole(AdminPanel, "admin");

export default AdminDashboard;
