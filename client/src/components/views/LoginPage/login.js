import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <input id="password" value={password} onChange={setToPassword} />
        <button>확인</button>
      </form>
    </div>
  );
};

export default Login;
