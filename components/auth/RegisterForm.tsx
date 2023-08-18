import React from "react";
import { Button, Form, Input, notification } from "antd";
import { RegisterFormDTO } from "@/api/dto/auth.dto";

import * as Api from "@/api";

import styles from "./Auth.module.scss";
import { setCookie } from "nookies";

export const RegisterForm: React.FC = () => {
  const onSubmit = async (values: RegisterFormDTO) => {
    try {
      const { token } = await Api.auth.register(values);

      notification.success({
        message: "Success",
        description: "Redirect to admin panel ...",
        duration: 2,
      });

      setCookie(null, "_token", token, {
        path: "/",
      });

      // location.href = "/dashboard";
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Incorrect login or password",
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[{ required: true, message: "Input your email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="fullName"
          rules={[{ required: true, message: "Input your username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Input your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
