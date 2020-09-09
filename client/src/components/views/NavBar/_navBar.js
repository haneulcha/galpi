import React, { useState, useEffect } from "react";
import { FormOutlined, PushpinOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { auth } from "../../../_actions/user_action";

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

const NavTitle = (props) => {
  return (
    <a href={props.link} className="nav-title-text">
      galpi
    </a>
  );
};

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <NavTitle link="/" />
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth()).then((res) => {
      console.log(res.payload);
      if (!res.payload.isAuth) {
        // 로그인 하지 않은 상태
        setLoggedIn(false);
      } else {
        //로그인 한 상태
        setLoggedIn(true);
        setUsername(res.payload.name);
      }
    });
  });

  const DropdownItem = (props) => {
    return (
      <a href={props.link} className="menu-item">
        {props.children}
      </a>
    );
  };

  return (
    <div className="dropdown">
      {loggedIn ? (
        <div>
          <DropdownItem>내 프로필</DropdownItem>
          <DropdownItem>로그아웃</DropdownItem>
        </div>
      ) : (
        <div>
          <DropdownItem link="users/login">로그인</DropdownItem>
          <DropdownItem link="users/register">회원가입</DropdownItem>
        </div>
      )}
    </div>
  );
};

export default App;
