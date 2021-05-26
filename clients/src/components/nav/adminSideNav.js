import { React } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const AdminSideNav = () => {
  return (
    <Menu
      className="col-md-10"
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
    >
      <Menu.Item key="1" icon={<MailOutlined />}>
        <NavLink to="/admin/dashboard">DASHBOARD</NavLink>
      </Menu.Item>
      <Menu.Item key="11" icon={<MailOutlined />}>
        <NavLink to="/admin/create-product">CREATE PRODUCT</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<MailOutlined />}>
        <NavLink to="/admin/products">PRODUCTS</NavLink>
      </Menu.Item>
      <Menu.Item key="3" icon={<MailOutlined />}>
        <NavLink to="/admin/category">CATAGORY</NavLink>
      </Menu.Item>
      <Menu.Item key="4" icon={<MailOutlined />}>
        <NavLink to="/admin/subcategory">SUB CATAGORY</NavLink>
      </Menu.Item>
      <Menu.Item key="5" icon={<CalendarOutlined />}>
        <NavLink to="/admin/coupon">COUPON</NavLink>
      </Menu.Item>
      <Menu.Item key="6" icon={<CalendarOutlined />}>
        <NavLink to="/admin/password">PASSWORD</NavLink>
      </Menu.Item>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="7">Option 3</Menu.Item>
        <Menu.Item key="8">Option 4</Menu.Item>
        <SubMenu key="sub1-2" title="Submenu">
          <Menu.Item key="9">Option 5</Menu.Item>
          <Menu.Item key="10">Option 6</Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
};

export default AdminSideNav;
