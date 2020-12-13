import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as EmailValidator from "email-validator";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { errorHandle } from "../../../_actions/error_actions";
import { loginUser } from "../../../_actions/user_action";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState({
    valid: "",
    message: "",
    ok: false,
  });
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    valid: "",
    message: "",
    ok: false,
  });

  const pwdHandler = (e) => {
    let val = e.target.value.trim();
    setPassword(val);
    if (val === "") {
      setPasswordValid({
        valid: "",
        message: "비밀번호를 입력하세요",
        ok: false,
      });
    } else setPasswordValid({ valid: "", message: "", ok: true });
  };

  const emailHandler = (e) => {
    let val = e.target.value.trim();
    setEmail(val);
    if (val === "") {
      setEmailValid({
        valid: "error",
        message: "이메일을 입력하세요",
        ok: false,
      });
    } else if (!EmailValidator.validate(val)) {
      setEmailValid({
        valid: "error",
        message: "이메일을 알맞게 입력하세요",
        ok: false,
      });
    } else {
      setEmailValid({
        valid: "",
        message: "",
        ok: true,
      });
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
    if (emailValid.ok && passwordValid.ok) {
      try {
        let userinfo = {
          email,
          password,
        };
        await dispatch(loginUser(userinfo));
        return history.replace("/home");
      } catch (e) {
        dispatch(errorHandle(e.response));
      }
    }
  };

  return (
    <div className="form login">
      <h1 className="page-title">로그인</h1>
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
            onChange={emailHandler}
          />
          <CheckCircleOutlined className="icon icon-suc" />
          <WarningOutlined className="icon icon-err" />
          <small>{emailValid.message}</small>
        </div>

        <div className={`form-control ${passwordValid.valid}`}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={pwdHandler}
          />

          <small>{passwordValid.message}</small>
        </div>
        <input type="submit" value="로그인" className="submit-btn" />
      </form>
    </div>
  );
};

export default LoginForm;
