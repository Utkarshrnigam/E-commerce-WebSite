import { React, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateUser } from "../../functions/auth";
const CompleteRegistration = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const userState = useSelector((state) => state).user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userState && userState.idtoken) {
      history.push("/");
    }
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 6) {
      toast.error("Password must be atleat 6 characters long");
      setLoading(false);
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (!result.user.emailVerified) {
        const error = new Error();
        error.message = "Email Not Varified";
        throw error;
      }
      window.localStorage.removeItem("emailForRegistration");
      const user = auth.currentUser;

      await user.updateProfile({
        displayName: userName,
      });
      await user.updatePassword(password);
      const idtoken = await user.getIdTokenResult();
      console.log("token", idtoken.token);
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
        })
        .catch((err) => {
          throw err;
        });
      localStorage.setItem("token", idtoken.token);
      toast.success("Registration Successfull");
      setTimeout(function () {}, 2000);

      history.push("/");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const CompleteRegisterForm = (
    <form onSubmit={onSubmitHandler}>
      <input
        className="form-control"
        type="email"
        placeholder="Enter your Email"
        value={email}
        disabled
      ></input>
      <br></br>
      <input
        className="form-control"
        type="text"
        placeholder="Enter your UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
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
      <button type="submit" className="btn btn-raised btn-dark">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row t-5">
        <div className="col-md-6 offset-md-3">
          {loading && <Spin />}
          <h1>Complete Registration</h1>
          {CompleteRegisterForm}
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistration;
