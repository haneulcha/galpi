import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 10,
    },
  },
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { email, name, password, username, confirm } = values;

    const userinfo = {
      email,
      username,
      name,
      password,
      passwordConfirmation: confirm,
    };

    dispatch(registerUser(userinfo));
  };

  return (
    <div className="form register">
      <h1 className="page-title">회원가입</h1>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: "email",
              message: "올바르지 않은 이메일 형식입니다.",
            },
            {
              required: true,
              message: "이메일을 입력하세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="아이디"
          rules={[
            {
              required: true,
              message: "아이디를 입력하세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력하세요.",
            },
            {
              min: 8,
              message: "비밀번호는 8글자 이상이여야 합니다.",
            },
            {
              pattern: /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
              message:
                "적어도 하나 이상의 영어 대문자, 소문자, 숫자가 포함되어야 합니다.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "입력하신 비밀번호가 서로 일치하지 않습니다."
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: "이름을 입력하세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="submit-btn">
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
