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
  Spin,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import Logo from "../vectors/Logo";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUser } from "../redux/reducers/userSlice";
import useLogin from "../hooks/auth/useLogin";

function SignInScreen() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const { login, loading, error } = useLogin();

  const onFinish = (values) => {
    login(values.email, values.password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
                  Log in to your account
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
                      {loading ? "Logging in " : "Log in"}
                    </Button>
                  </Form.Item>
                </Form>
                <div className='flex justify-center'>
                  <p className="text-center mr-3">Don't have an account?</p>
                  <Link to="/signup">
                    <p className="text-center text-blue-600 hover:underline hover:text-indigo-800">
                      Sign up for an account
                    </p>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </>
      </Content>
    </Layout>
  );
}

export default SignInScreen;
