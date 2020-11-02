import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { AUTH_KEY, setExp, TTL } from "../../../util/auth";


const LoginForm = (props) => {
  const dispatch = useDispatch();
  const { location, history } = props
  const { state } = location

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { email, password } = values;

    let userinfo = {
      email,
      password,
    };

    dispatch(loginUser(userinfo)).then((res) => {
      setExp(AUTH_KEY, res.payload.user, TTL);
      if( state && state.from ) {
        history.replace(state.from)
      } else { history.replace('/') }

    }).catch(e => console.error(e));
  };

  return (
    <div className="login">
    <h1>로그인</h1>
    <div className="login-form">
      <Form
        name="login"
        // className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "이메일 주소를 입력하세요." }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="이메일 주소"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력하세요." }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            로그인
          </Button>
          혹은 <a href="/register">회원가입!</a>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default LoginForm;
