import React from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../_actions/user_action";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { delExp, AUTH_KEY } from "../../../util/auth";

const NavBar = (props) => {
  const { loggedIn, username } = useSelector((state) => ({
    loggedIn: state.auth.loggedIn,
    username: state.auth.username,
  }));

  const dispatch = useDispatch();
  const logout = async () => {
    await dispatch(logOutUser())
      .then((res) => {
        console.log("after logout", res);
      })
      .catch((e) => console.error(e));
    delExp(AUTH_KEY);
  };

  const menu = (
    <Menu className="navbar-dropdown">
      <Menu.Item key="0">
        <NavLink to="/dashboard">대시보드</NavLink>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="2" onClick={logout} style={{ color: "#276FBF" }}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header>
        <div className="navbar">
          <div className="logo-wrapper">
            <NavLink exact to="/">
              <img className="logo" src="/galpi_logo.png" alt="logo galpi" />
            </NavLink>
          </div>
          {!loggedIn ? (
            <ul>
              <li>
                <NavLink exact to="/">
                  메인
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">로그인</NavLink>
              </li>
              <li>
                <NavLink to="/register">회원가입</NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink exact to="/">
                  메인
                </NavLink>
              </li>
              <li>
                <NavLink to="/post">갈피 남기기</NavLink>
              </li>
              <li>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <button
                    className="ant-dropdown-link navbar-dropdown-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    {/* Q: 왜 a 링크 없으면 onlyChild 에러 발생? */}
                    {username} <DownOutlined />
                  </button>
                </Dropdown>
              </li>
            </ul>
          )}
        </div>
      </header>
      {props.children}
    </>
  );
};

export default NavBar;
