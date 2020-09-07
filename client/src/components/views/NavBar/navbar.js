import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useDropdown from "../../../useDropdown";

const NavBar = () => {
  //   const [loggedIn, setLoggedIn] = useState(false);
  const [myinfo, MyinfoDropdown, setMyinfo] = useDropdown("내 정보", []);

  const loggedOut = [
    ["로그인", "/users/login"],
    ["회원가입", "/users/register"],
  ];
  const loggedIn = [
    ["내 프로필", `/profile/${username}`], // username
    ["로그아웃", "/users/logout"],
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth()).then((res) => {
      if (!res.payload.isAuth) {
        // 로그인 하지 않은 상태
        if (option) {
          props.history.push("/login");
        }
      } else {
        //로그인 한 상태
        if (adminRoute && !res.payload.isAdmin) {
          props.history.push("/");
        } else {
          if (option === false) {
            props.history.push("/");
          }
        }
      }
    });
  }, []);

  return (
    <header>
      <Link to="/" className="header">
        마디갈피
      </Link>
      <Link to="/post" className="nav post">
        포스팅
      </Link>
      <MyinfoDropdown />
    </header>
  );
};

export default NavBar;
