import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as EmailValidator from "email-validator";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { errorHandle } from "../../../_actions/error_actions";
import { registerUser } from "../../../_actions/user_action";

const RegistrationForm = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState({
    valid: "",
    message: "",
    ok: false,
  });
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState({
    valid: "",
    message: "최소 2글자 이상의 영문",
    ok: false,
  });
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState({
    valid: "",
    message: "",
    ok: false,
  });
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    valid: "",
    message: "영어 대·소문자와 숫자 포함, 8글자 이상.",
    ok: false,
  });
  const [confirm, setConfirm] = useState("");
  const [confirmValid, setConfirmValid] = useState({
    valid: "",
    message: "",
    ok: false,
  });

  const onDispatch = async () => {
    if (
      emailValid.ok &&
      usernameValid.ok &&
      nameValid.ok &&
      passwordValid.ok &&
      confirmValid.ok
    ) {
      let userinfo = {
        email,
        username,
        name,
        password,
        passwordConfirmation: confirm,
      };
      await dispatch(registerUser(userinfo))
        .then((res) => {
          alert("회원가입에 성공했습니다.");
          history.replace("/login");
        })
        .catch((e) => dispatch(errorHandle(e)));
    }
    return alert("정확하게 입력해주세요");
  };

  const isPassword = (pwd) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(pwd);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailValid({
        valid: "error",
        message: "이메일을 입력하세요",
        ok: false,
      });
    } else if (!EmailValidator.validate(email)) {
      setEmailValid({
        valid: "error",
        message: "이메일을 올바르게 입력하세요",
        ok: false,
      });
    } else {
      setEmailValid({
        valid: "success",
        message: "",
        ok: true,
      });
    }

    if (username === "") {
      setUsernameValid({
        valid: "error",
        message: "아이디를 입력하세요",
        ok: false,
      });
    } else {
      setUsernameValid({ valid: "success", message: "", ok: true });
    }

    if (name === "") {
      setNameValid({ valid: "error", message: "이름을 입력하세요", ok: false });
    } else {
      setNameValid({ valid: "success", message: "", ok: true });
    }

    if (password === "") {
      setPasswordValid({
        valid: "error",
        message: "비밀번호를 입력하세요",
        ok: false,
      });
    } else if (!isPassword(password)) {
      setPasswordValid({
        valid: "error",
        message: "영어 대·소문자와 숫자 포함하고 8글자 이상이여야 합니다",
        ok: false,
      });
    } else setPasswordValid({ valid: "success", message: "", ok: true });

    if (confirm === "") {
      setConfirmValid({
        valid: "error",
        message: "비밀번호 확인을 입력하세요",
        ok: false,
      });
    } else if (password !== confirm) {
      setConfirmValid({
        valid: "error",
        message: "비밀번호를 동일하게 입력하세요",
        ok: false,
      });
    } else setConfirmValid({ valid: "success", message: "", ok: true });

    onDispatch();
  };

  return (
    <div className="form register">
      <h1 className="page-title">회원가입</h1>
      <form onSubmit={onFinish}>
        <div className={`form-control ${emailValid.valid}`}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            value={email}
            placeholder="예) galpi@galpi.com"
            min="8"
            max="254"
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <CheckCircleOutlined className="icon icon-suc" />
          <WarningOutlined className="icon icon-err" />
          <small>{emailValid.message}</small>
        </div>

        <div className={`form-control ${usernameValid.valid}`}>
          <label htmlFor="username">아이디(영문)</label>
          <input
            id="username"
            type="text"
            maxLength="128"
            pattern=".{3,}"
            title="최소 2글자 이상"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <CheckCircleOutlined className="icon icon-suc" />
          <WarningOutlined className="icon icon-err" />
          <small>{usernameValid.message}</small>
        </div>

        <div className={`form-control ${nameValid.valid}`}>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <CheckCircleOutlined className="icon icon-suc" />
          <WarningOutlined className="icon icon-err" />
          <small>{nameValid.message}</small>
        </div>

        <div className={`form-control ${passwordValid.valid}`}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <CheckCircleOutlined className="icon icon-suc" />
          <WarningOutlined className="icon icon-err" />

          <small>{passwordValid.message}</small>
        </div>
        <div className={`form-control ${confirmValid.valid}`}>
          <label htmlFor="confirm">비밀번호 확인</label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value.trim())}
          />
          <CheckCircleOutlined className="icon icon-suc" />
          <WarningOutlined className="icon icon-err" />
          <small>{confirmValid.message}</small>
        </div>

        <input type="submit" value="가입하기" className="submit-btn" />
      </form>
    </div>
  );
};

export default RegistrationForm;
