import { React, useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    setCurrent(e.key);
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
      <Menu.Item
        key="register"
        icon={<LoginOutlined />}
        className="float-right"
      >
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Menu.Item>

      <SubMenu key="SubMenu" icon={<UserOutlined />} title="Username">
        <Menu.ItemGroup title="Username">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};
export default Header;
