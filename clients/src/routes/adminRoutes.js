import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "../routes/redirectLoading/LoadingToRedirect";
import { getCurrrentAdmin } from "../functions/auth";
const AdminRoutes = ({ children, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const state = useSelector((state) => ({ ...state }));
  const user = state.user;
  useEffect(() => {
    if (user != null && user.idtoken);
    {
      if (user == null) return;
      getCurrrentAdmin(user.idtoken)
        .then((res) => {
          setIsAdmin(true);
        })
        .catch((err) => {
          setIsAdmin(false);
          console.log(err);
        });
    }
  }, [state]);

  if (isAdmin) {
    return <Route {...rest} />;
  } else {
    // console.log(user);
    return <LoadingToRedirect />;
  }
};

export default AdminRoutes;
