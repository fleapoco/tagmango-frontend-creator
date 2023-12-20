"use client";

import useApi from "@/hooks/useApi";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Space } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import style from "../style/dashboard.module.scss";
const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

type ItemType = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  link?: string;
  children?: ItemType[];
};

const items: ItemType[] = [
  {
    key: "1",
    label: "Dashboard",
    link: "/",
  },
  {
    key: "sub1",
    label: "Productivity",
    icon: <UserOutlined />,
    children: [
      { key: "3", label: "Habits", link: "/habit" },
      { key: "4", label: "Tasks", link: "/task" },
    ],
  },
  {
    key: "2",
    label: "Data",
    icon: <FileOutlined />,
    link: "/data",
  },
  {
    key: "5",
    label: "Charity",
    icon: <FileOutlined />,
    link: "/charity",
  },
  {
    key: "6",
    label: "Quizzes",
    icon: <FileOutlined />,
    link: "/quizzes",
  },
];

interface Props {
  children: React.ReactNode;
}

export default function PageLayout(props: Props) {
  const { getCharities } = useApi();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const currentPathname = usePathname();

  useEffect(() => {
    // Update selected key based on the current pathname
    const key = items.find((item) => item.link === currentPathname)?.key;
    if (key) {
      setSelectedKeys([key]);
    }
  }, [currentPathname]);

  return (
    <>
      <div className={`${style["dashboard-wrapper"]}`}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Layout className="main-layout">
            <Sider className="sidebar-main">
              <div className="inner-sidebar">
                <Menu
                  defaultSelectedKeys={["1"]}
                  selectedKeys={selectedKeys}
                  mode="inline"
                  className="sidebar"
                  style={{ padding: "0 8px" }}
                >
                  {items.map((item) =>
                    item.children ? (
                      <SubMenu
                        key={item.key}
                        icon={item.icon}
                        title={item.label}
                      >
                        {item.children.map((subItem) => (
                          <Menu.Item key={subItem.key}>
                            {subItem.link ? (
                              <Link href={subItem.link}>{subItem.label}</Link>
                            ) : (
                              <span>{subItem.label}</span>
                            )}
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    ) : (
                      <Menu.Item key={item.key} icon={item.icon}>
                        {item.link ? (
                          <Link href={item.link}>{item.label}</Link>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </Menu.Item>
                    )
                  )}
                </Menu>
              </div>
            </Sider>
            <Layout className="main-contain-layout">
              <Content>{props.children}</Content>
            </Layout>
          </Layout>
        </Space>
      </div>
    </>
  );
}
