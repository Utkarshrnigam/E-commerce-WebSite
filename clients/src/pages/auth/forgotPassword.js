import { React, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const userState = useSelector((state) => state).user;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(`Reset password email has been sent to ${email}`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.meassage);
      });
  };

  const forgotPasswordForm = (
    <form onSubmit={onSubmitHandler}>
      <input
        className="form-control"
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      ></input>
      <br></br>
      <button type="submit" className="btn btn-raised btn-dark">
        Reset Password
      </button>
    </form>
  );
  if (userState && userState.idToken) {
    history.push("/");
  }
  return (
    <div className="container p-5">
      <div className="row t-5">
        <div className="col-md-6 offset-md-3">
          {loading && <Spin />}
          <h1>Forgot Password</h1>
          {forgotPasswordForm}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
