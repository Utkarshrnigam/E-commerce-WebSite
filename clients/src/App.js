import { React, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Header from "./components/nav/header";
import { ToastContainer } from "react-toastify";
import CompleteRegistration from "./pages/auth/completeRegistration";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgotPassword from "./pages/auth/forgotPassword";
import { getCurrrentUser } from "./functions/auth";
import History from "./pages/user/history";
import Wishlist from "./pages/user/wishlist";
import UpdatePassword from "./pages/user/updatePassword";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/adminRoutes";
import AdminDashboard from "./pages/admin/dashboard";
import CategoryManage from "./pages/admin/category/categoryManage";
import SubCatManage from "./pages/admin/subCat/subCatManage";
import UpdateCategory from "./pages/admin/category/updateCategory";
import CreateProduct from "./pages/admin/product/createProduct";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idtoken = await user.getIdTokenResult();

        getCurrrentUser(idtoken.token).then((res) => {
          console.log(res.data);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              idtoken: idtoken.token,
              userName: res.data[0].name.split(" ")[0],
              emailId: res.data[0].email,
              role: res.data[0].role,
            },
          });
        });
      }
    });
  }, [dispatch]);
  return (
    <>
      <Header></Header>
      <ToastContainer />
      <Switch>
        {/* <div>{user}</div> */}
        <AdminRoutes
          exact
          path="/admin/create-product"
          component={CreateProduct}
        />
        <AdminRoutes exact path="/admin/subcategory" component={SubCatManage} />
        <AdminRoutes
          exact
          path="/admin/update-category/:slug"
          component={UpdateCategory}
        />
        <AdminRoutes exact path="/admin/category" component={CategoryManage} />
        <AdminRoutes exact path="/admin/dashboard" component={AdminDashboard} />
        <UserRoutes exact path="/user/history" component={History} />
        <UserRoutes exact path="/user/wishlist" component={Wishlist} />
        <UserRoutes
          exact
          path="/user/update-password"
          component={UpdatePassword}
        />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
