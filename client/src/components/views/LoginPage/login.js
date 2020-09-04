import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    dispatch(loginUser(body)).then((res) => console.log("after login", res));
  };

  const setToEmail = (e) => {
    setEmail(e.target.value); // currentTarget.value?
  };
  const setToPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>로그인</h2>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" value={email} onChange={setToEmail} />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={setToPassword}
        />
        <button type="submit" onClick={submitHandler}>
          확인
        </button>
      </form>
    </div>
  );
};

export default Login;
