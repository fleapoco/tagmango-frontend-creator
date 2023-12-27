import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Flex, Space } from "antd";

import Image from "next/image";
import Link from "next/link";
import {
  AngleIcon,
  Course,
  Dashboard,
  Feed,
  Logout,
  Notifications,
  SchedulerIcon,
} from "./common/icons";

const items: MenuProps["items"] = [
  {
    label: (
      <>
        <Space align="center" className="head-profile">
          <Avatar
            onClick={(e) => e?.preventDefault()}
            size={45}
            src="https://tagmango.com/staticassets/avatar-placeholder.png-1612857612139.png"
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
          <div>
            <h5>Chetan</h5>
            <Link href="#">VIEW PROFILE</Link>
          </div>
        </Space>
      </>
    ),
    key: "0",
  },
  {
    label: (
      <ul className="flex-wrap">
        <li>
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Space align="center">
              <div className="circle-icon">
                <SchedulerIcon />
              </div>

              <span>Scheduler</span>
            </Space>
            <AngleIcon />
          </Flex>
        </li>
        <li>
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Space align="center">
              <div className="circle-icon">
                <Notifications />
              </div>

              <span>Notifications</span>
            </Space>
            <AngleIcon />
          </Flex>
        </li>
        <li>
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Space align="center">
              <div className="circle-icon">
                <Logout />
              </div>
              <span>Logout</span>
            </Space>
          </Flex>
        </li>
      </ul>
    ),
    key: "1",
  },
];

export const Header = () => {
  return (
    <>
      <header className="header-main">
        <Flex
          justify="space-between"
          align="center"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div className="logo-wrapper" style={{ paddingLeft: "20px" }}>
            <Image
              src="https://tagmango.com/staticassets/tagmango_typeface-%281%29.svg-1622023999423.svg"
              width={130}
              height={45}
              quality={100}
              objectFit="contain"
              alt="Logo"
            />
          </div>
          <div className="header-links">
            <ul>
              <li>
                <a href="#">
                  <Dashboard />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <Feed />
                  <span>Feed</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <Course />
                  <span>Courses</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <Dashboard />
                  <span>Messages</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <Dashboard />
                  <span>Quiz</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="header-user-wrapper" style={{ paddingRight: "20px" }}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Avatar
                onClick={(e) => e?.preventDefault()}
                size={37}
                src="https://tagmango.com/staticassets/avatar-placeholder.png-1612857612139.png"
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </Flex>
      </header>
    </>
  );
};
