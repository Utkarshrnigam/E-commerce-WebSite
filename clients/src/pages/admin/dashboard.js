import { React } from "react";
import AdminSideNav from "../../components/nav/adminSideNav";
const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div>
          <AdminSideNav />
        </div>
        <div className="col">user dashboard</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
