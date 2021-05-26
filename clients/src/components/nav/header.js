import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import firebase from "firebase";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state).user;
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={current}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="mail" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      {!userState && (
        <Menu.Item
          key="register"
          icon={<LoginOutlined />}
          className="float-right"
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}

      {!userState && (
        <Menu.Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}

      {userState && (
        <SubMenu
          key="SubMenu"
          className="float-right"
          icon={<UserOutlined />}
          title={userState.userName}
        >
          {userState.role == "subscriber" && (
            <Menu.Item key="setting:1">
              <Link to="/user/history"> Dashboard</Link>
            </Menu.Item>
          )}

          {userState.role == "admin" && (
            <Menu.Item key="setting:1">
              <Link to="/admin/dashboard"> Dashboard</Link>
            </Menu.Item>
          )}

          <Menu.Item icon={<LoginOutlined />} onClick={logoutHandler}>
            LogOut
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};
export default Header;
