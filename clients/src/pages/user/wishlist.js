import { React } from "react";
import UserSideNav from "../../components/nav/userSideNav";
const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserSideNav />
        </div>
        <div className="col">user Wishlist</div>
      </div>
    </div>
  );
};

export default Wishlist;
