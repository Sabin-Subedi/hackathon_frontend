import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  Col,
  Row,
  Typography,
  Divider,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Content } from "antd/lib/layout/layout";
import Logo from "../vectors/Logo";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUser } from "../redux/reducers/userSlice";
import useRegister from "../hooks/auth/useRegister";

function SignUpScreen() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const { register, loading } = useRegister();

  const onFinish = (values) => {
    register(values.email, values.password, values.fullname);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  console.log(loading);

  return (
    <Layout>
      <Content
        style={{
          backgroundColor: "white",
          height: "100vh",
          padding: "2.5rem 0",
        }}
      >
        <>
          <Row align="middle" justify="center" style={{ height: "100%" }}>
            <Col flex xs={11} sm={8} md={8} lg={7}>
              <div className="mb-3">
                <div className="flex h-16 justify-center w-full ">
                  <Logo />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 text-center">
                  Openwave
                </h1>
              </div>
              <div className="bg-white p-8 pb-4 rounded shadow-lg mb-6">
                <h1 className="text-xl text-gray-500 mb-6 text-center">
                  Sign up for your account
                </h1>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  size="large"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                    size="large"
                  >
                    <Input className="mb-4" placeholder="Enter your email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters!",
                      },
                    ]}
                  >
                    <Input type="password" placeholder="Enter your password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      className="login-form-button"
                      loading={loading}
                      block
                    >
                      {loading ? "Signing up..." : "Create an account"}
                    </Button>
                  </Form.Item>
                </Form>
                <p className="text-gray-400 text-center">Or</p>

                <Link to="/login">
                  <p className="text-center text-blue-600 hover:underline hover:text-indigo-800">
                    Already have an Openwave account? Log in
                  </p>
                </Link>
              </div>
            </Col>
          </Row>
        </>
      </Content>
    </Layout>
  );
}

export default SignUpScreen;
