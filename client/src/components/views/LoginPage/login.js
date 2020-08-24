import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    axios.post("/api/users/login", body).then((res) => console.log(res));
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
