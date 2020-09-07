import React, { useState } from "react";
import { FormOutlined, PushpinOutlined, UserOutlined } from "@ant-design/icons";

const App = () => {
  return (
    <Navbar>
      <NavItem icon={<PushpinOutlined className="ant-d" />} link="/" />
      <NavItem icon={<FormOutlined className="ant-d" />} link="post" />
      <NavItem icon={<UserOutlined className="ant-d" />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
};

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a
        href={props.link}
        className="icon-button"
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
};
//open && props.children = children이 있다면 !

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const DropdownItem = (props) => {
    return (
      <a href="#" className="menu-item">
        {props.children}
      </a>
    );
  };

  return (
    <div className="dropdown">
      <DropdownItem>내 프로필</DropdownItem>
    </div>
  );
};

export default App;
