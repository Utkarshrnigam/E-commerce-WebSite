import { React } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const UserSideNav = () => {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
    >
      <Menu.Item key="1" icon={<MailOutlined />}>
        <Link to="/user/history">HISTORY</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<CalendarOutlined />}>
        <Link to="/user/update-password">UPDATE PASSWORD</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<CalendarOutlined />}>
        <Link to="/user/wishlist">WISHLIST</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="4">Option 3</Menu.Item>
        <Menu.Item key="5">Option 4</Menu.Item>
        <SubMenu key="sub1-2" title="Submenu">
          <Menu.Item key="6">Option 5</Menu.Item>
          <Menu.Item key="7">Option 6</Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
};

export default UserSideNav;
