import { React } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "../routes/redirectLoading/LoadingToRedirect";
const UserRoutes = ({ children, ...rest }) => {
  const userState = useSelector((state) => state).user;
  if (userState && userState.idtoken) {
    console.log(userState);
    return <Route {...rest} render={() => children} />;
  } else {
    console.log(userState);
    return <LoadingToRedirect />;
  }
};

export default UserRoutes;
