import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../_actions/user_action";
import { errorHandle } from "../../../_actions/error_actions";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = (props) => {
  const { loggedIn, username } = useSelector((state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
  }));
  const [menuToggle, setMenuToggle] = useState(false);
  const { history } = props;

  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await dispatch(logOutUser());
      alert("로그아웃 되었습니다");
      history.replace("/");
    } catch (e) {
      dispatch(errorHandle(e.response));
    }
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuToggle(!menuToggle);
  };

  return (
    <>
      <header>
        <Link to="/">
          <h1 className="logo">galpi</h1>
        </Link>

        <svg
          height="40px"
          id="menu-btn"
          className="open"
          viewBox="0 0 32 32"
          onClick={toggleMenu}
        >
          <path
            fill="#db2b39"
            d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
          />
        </svg>

        <nav id="nav" className={menuToggle ? `open-nav` : undefined}>
          <svg
            viewBox="0 0 24 24"
            id="exit-btn"
            className="exit"
            onClick={toggleMenu}
          >
            <path
              id="exit"
              fill="#db2b39"
              d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
            />
          </svg>
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
              <li className="sub">
                <NavLink to={`/user/${username}`} className="nav-username">
                  {username}
                </NavLink>
                <div className="submenu">
                  <ul>
                    <li>
                      <NavLink to="/dashboard">대시보드</NavLink>
                    </li>
                    <li onClick={logout}>
                      <span>로그아웃</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          )}
        </nav>
      </header>
      {props.children}
    </>
  );
};

export default NavBar;
