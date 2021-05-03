import { React } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Header from "./components/nav/header";
import { ToastContainer } from "react-toastify";
import CompleteRegistration from "./pages/auth/completeRegistration";

const App = () => {
  return (
    <div>
      <Header></Header>
      <ToastContainer />
      <Switch>
        <Route path="/complete-registration" component={CompleteRegistration} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
