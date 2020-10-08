import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [username, setUsername] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (pwConfirm !== password) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let body = {
      email,
      password,
      username,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        console.log("register success");
        console.log("res.payload", res.payload); // {success: true}
        // props.history.push("/login");
      } else {
        alert("failed to register");
      }
    });
  };

  const setToEmail = (e) => {
    setEmail(e.target.value); // currentTarget.value?
  };
  const setToPassword = (e) => {
    setPassword(e.target.value);
  };

  const setToPasswordConfirm = (e) => {
    setPwConfirm(e.target.value);
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
        <input
          id="password"
          type="password"
          value={password}
          onChange={setToPassword}
        />
        <label htmlFor="password-confirm">비밀번호 확인</label>
        <input
          id="password-confirm"
          type="password"
          value={pwConfirm}
          onChange={setToPasswordConfirm}
        />
        <div></div>
        <label htmlFor="username">이름</label>
        <input id="username" value={username} onChange={setToUsername} />
        <button type="submit" onClick={submitHandler}>
          확인
        </button>
      </form>
    </div>
  );
};

export default Register;
