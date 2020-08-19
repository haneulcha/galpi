import React, { useState } from "react";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const setToEmail = (e) => {
    setEmail(e.target.value); // currentTarget.value?
  };
  const setToPassword = (e) => {
    setPassword(e.target.value);
  };
  const setToUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" value={email} onChange={setToEmail} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" value={password} onChange={setToPassword} />
        <label htmlFor="username">이메일 주소</label>
        <input id="username" value={username} onChange={setToUsername} />
        <button>확인</button>
      </form>
    </div>
  );
};

export default Register;
