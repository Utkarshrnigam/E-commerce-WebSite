import { React, useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Spin, Button } from "antd";
import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUpdateUser } from "../../functions/auth";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state).user;

  useEffect(() => {
    if (userState && userState.idtoken) {
      history.push("/");
    }
  });

  const roleBasedRedirect = (role) => {
    if (role == "admin") history.push("/admin/dashboard");
    else history.push("/");
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // console.log(email, password);
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      const { user } = result;

      const idtoken = await user.getIdTokenResult();
      // const userName = await user.displayName;
      // const emailId = await user.email;
      addUpdateUser(idtoken.token)
        .then((res) => {
          console.log(res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              idtoken: idtoken.token,
              userName: res.data.name.split(" ")[0],
              emailId: res.data.email,
              role: res.data.role,
            },
          });
          localStorage.setItem("token", idtoken.token);
          toast.success("Login Successfull");
          roleBasedRedirect(res.data.role);
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const GoogleLoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idtoken = await user.getIdTokenResult();
        addUpdateUser(idtoken.token)
          .then((res) => {
            console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                idtoken: idtoken.token,
                userName: res.data.name.split(" ")[0],
                emailId: res.data.email,
                role: res.data.role,
              },
            });
            localStorage.setItem("token", idtoken.token);
            roleBasedRedirect(res.data.role);
            toast.success("Login Successfull");
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const LoginForm = (
    <form>
      <input
        className="form-control"
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        required
      ></input>

      <br></br>
      <input
        className="form-control"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>
      <br></br>
      <Button
        onClick={loginHandler}
        type="primary"
        shape="round"
        className="mb-3"
        block
        disabled={!email || password.length < 6}
        size="large"
        icon={<LoginOutlined />}
      >
        Login with email/password
      </Button>
      <br></br>
      <Button
        onClick={GoogleLoginHandler}
        type="danger"
        shape="round"
        className="mb-3"
        block
        size="large"
        icon={<GoogleOutlined />}
      >
        Login with Google
      </Button>
      <Link to="/forgot-password" className="float-right text-danger">
        {" "}
        Forgot Password?{" "}
      </Link>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row t-5">
        <div className="col-md-6 offset-md-3">
          {loading && <Spin />}
          <h1>LogIn</h1>
          {LoginForm}
        </div>
      </div>
    </div>
  );
};

export default Login;
