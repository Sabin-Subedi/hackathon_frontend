import { Avatar, Button, Dropdown, Input, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../vectors/Logo";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUser } from "../redux/reducers/userSlice";
import { BsCaretDownFill } from "react-icons/bs";
import { UserOutlined } from "@ant-design/icons";
import { signOutUser } from "../hooks/auth";

const menu = (
  <div className="bg-white shadow rounded overflow-hidden mt-5">
    <Menu>
      <Menu.Item>
        <Link to="/profile">
          <p className="pr-10 mb-0">Your Profile</p>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/">Settings</Link>
      </Menu.Item>
      <Menu.Item onClick={signOutUser}>Sign out</Menu.Item>
    </Menu>
  </div>
);

function Navbar() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUser);

  console.log(user);

  return (
    <div className="bg-gray-800">
      <nav className="container mx-auto flex items-center py-4 justify-between">
        <section className="nav_left flex items-center">
          <Link to="/">
            <div className="nav_logo cursor-pointer flex items-center">
              <div className=" w-12 ">
                <Logo />
              </div>
              <h1 className="text-2xl text-gray-200 mb-0">Openwave</h1>
            </div>
          </Link>
          <ul className="ml-5 flex items-center text-gray-100 mb-0">
            <li className="mb-0 py-2 px-3 font-medium cursor-pointer hover:bg-gray-900 rounded-lg">
              Dashboard
            </li>
            <li className="mb-0 py-2 px-3 font-medium cursor-pointer hover:bg-gray-900 rounded-lg">
              Teams
            </li>
            <li className="mb-0 py-2 px-3 font-medium cursor-pointer hover:bg-gray-900 rounded-lg">
              Projects
            </li>
          </ul>
        </section>

        <section className="nav_right flex items-center flex-1 justify-end">
          <div className="max-w-xs w-full bg-gray-700 rounded text-white">
            <Input
              size="large"
              prefix={<IoSearch className="w-6 text-white" />}
              bordered={false}
              theme="dark"
              allowClear
              className="ant-input-affix-wrapper-dark"
              style={{ color: "#fff" }}
            />
          </div>
          {isLoggedIn ? (
            <>
              <div className="ml-5 cursor-pointer ">
                <FaRegBell className="text-xl text-gray-400 hover:text-white" />
              </div>
              <div className="ml-4 mr-2">
                <Avatar
                  src={user?.image}
                  size="large"
                  icon={!user?.image && <UserOutlined />}
                  style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                >
                  {!user?.image && user?.displayName?.charAt(0)}
                </Avatar>
              </div>
              <div>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <BsCaretDownFill className="text-gray-100 cursor-pointer" />
                </Dropdown>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="ml-5 bg-blue-700 hover:bg-blue-800 text-white h-full py-2 px-6 rounded">
                Sign In
              </button>
            </Link>
          )}
        </section>
      </nav>
    </div>
  );
}

export default Navbar;
