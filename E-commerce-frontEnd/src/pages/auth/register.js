import { React, useState } from "react";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import { Spin } from "antd";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
        `Confirmation Link has been successfully sent to ${email}!! Click the link to varify`
      );

      window.localStorage.setItem("emailForRegistration", email);
      setEmail("");
      setLoading(false);
      history.push("/login");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const registerForm = (
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
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row t-5">
        <div className="col-md-6 offset-md-3">
          {loading && <Spin />}
          <h1>Register</h1>
          {registerForm}
        </div>
      </div>
    </div>
  );
};

export default Register;
