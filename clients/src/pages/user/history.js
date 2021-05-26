import { React } from "react";
import UserSideNav from "../../components/nav/userSideNav";
const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserSideNav />
        </div>
        <div className="col">user history</div>
      </div>
    </div>
  );
};

export default History;
