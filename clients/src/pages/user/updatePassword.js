import { React, useEffect, useState } from "react";
import UserSideNav from "../../components/nav/userSideNav";
import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { auth } from "../../firebase";
const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then((res) => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated Succesfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };

  let form = (
    <form onSubmit={updatePasswordHandler}>
      <div className="form-group">
        <label>Your New Password</label>
        <input
          className="form-control"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <br></br>
        <button
          className="btn btn-primary"
          disabled={password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  let spinner = null;
  if (loading) spinner = <Spin />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <UserSideNav />
        </div>
        <div className="col">
          {spinner}
          <h1>Update Password</h1>
          {form}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
