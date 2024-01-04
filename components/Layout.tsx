'use client';

import useApi from '@/hooks/useApi';
import type { MenuProps } from 'antd';
import { Button, Flex, Layout, Menu, Space, Typography } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
('use client');

import {
  MdAdsClick,
  MdCastForEducation,
  MdDashboard,
  MdDatasetLinked,
  MdEmojiEvents,
  MdOutlineQuiz,
} from 'react-icons/md';

import useAPI from '@/hooks/useApi';
import { useAppDispatch } from '@/hooks/useRedux';
import { UserDetails } from '@/types';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Analytics, CollapseArrow, NotCollapseArrow } from './common/icons';
import style from '/style/dashboard.module.scss';

const { Sider, Content } = Layout;

const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

type ItemType = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  link?: string;
  children?: ItemType[];
  creator: boolean;
};

const fanItems: ItemType[] = [
  {
    key: '1',
    label: 'Dashboard',
    link: '/',
    icon: <MdDashboard size={20} />,
    creator: false,
  },
  {
    key: 'sub1',
    label: 'Productivity',
    icon: <Analytics />,
    creator: false,
    children: [
      {
        key: 'sub2',
        label: 'Habits',
        link: '/productivity/habit',
        creator: false,
      },
      {
        key: 'sub3',
        label: 'Tasks',
        link: '/productivity/task',
        creator: false,
      },
    ],
  },
  {
    key: '2',
    label: 'Data',
    icon: <MdDatasetLinked size={20} />,
    link: '/data',
    creator: false,
  },
  {
    key: '3',
    label: 'Events',
    icon: <MdEmojiEvents size={20} />,
    link: '/events',
    creator: false,
  },
  {
    key: '4',
    label: 'Charity',
    icon: <Analytics />,
    link: '/charity',
    creator: false,
  },
  {
    key: '5',
    label: 'Quizzes',
    icon: <MdOutlineQuiz size={20} />,
    link: '/quizzes',
    creator: false,
  },
  {
    key: '6',
    label: 'Degree',
    icon: <MdCastForEducation size={20} />,
    link: '/degree',
    creator: false,
  },
  {
    key: '7',
    label: 'Achievement',
    icon: <MdAdsClick size={20} />,
    link: '/achievement',
    creator: false,
  },
];

const creatorItems: ItemType[] = [
  {
    key: '8',
    label: 'Dashboard',
    icon: <MdDashboard size={20} />,
    link: '/creator/dashboard',
    creator: false,
  },
  {
    key: 'sub2',
    label: 'Productivity',
    icon: <Analytics />,
    creator: false,
    children: [
      {
        key: 'sub3',
        label: 'Habits',
        link: '/creator/productivity/habits',
        creator: false,
      },
      {
        key: 'sub4',
        label: 'Tasks',
        link: '/creator/productivity/tasks',
        creator: false,
      },
    ],
  },
  {
    key: '9',
    label: 'Event',
    icon: <MdEmojiEvents size={20} />,
    link: '/creator/events',
    creator: true,
  },
  {
    key: '10',
    label: 'Charity',
    icon: <MdEmojiEvents size={20} />,
    link: '/creator/charity',
    creator: true,
  },
  {
    key: '11',
    label: 'Quiz',
    icon: <MdOutlineQuiz size={20} />,
    link: '/creator/quizzes',
    creator: true,
  },
  {
    key: '12',
    label: 'Degree',
    icon: <MdCastForEducation size={20} />,
    link: '/creator/degree',
    creator: true,
  },
  {
    key: '13',
    label: 'Achievement',
    icon: <MdCastForEducation size={20} />,
    link: '/creator/achievement',
    creator: true,
  },
];

interface Props {
  children: React.ReactNode;
  // userDetails?: UserDetails;
}

export default function PageLayout(props: Props) {
  let router = useRouter();
  let currentPath = usePathname();
  const params = useSearchParams();
  const refreshToken = params.get('refreshToken');
  const { authenticateUser, getUserDetails } = useAPI();
  const [authUser, setAuthUser] = useState<UserDetails | null>(null);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (refreshToken) {
        try {
          const token = await authenticateUser({ token: refreshToken });
          console.log({ token });
          if (token) {
            setCookie('token', token.jwtToken);
            const user = await getUserDetails();
            if (user) {
              setAuthUser(user);
              localStorage.setItem('userData', JSON.stringify(user));
              console.log({ user });
              setUserRole(user.roles);
              router.push(currentPath);
            }
          }
        } finally {
        }
      } else {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          setAuthUser(user);
          setUserRole(user.roles);
        }
      }
    };

    fetchData();
  }, [refreshToken]);

  // const userDetails = useAppSelector(getUserStored);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();

  const { getCharities } = useApi();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const currentPathname = usePathname();

  useEffect(() => {
    const findSelectedKey = (item: ItemType): string | undefined => {
      if (item.link === currentPathname) {
        return item.key;
      } else if (item.children) {
        for (const subItem of item.children) {
          const key = findSelectedKey(subItem);
          if (key) {
            return key;
          }
        }
      }
      return undefined;
    };
    let newSelectedKey: string | undefined;
    let items;
    if (userRole === 'fan_completed') items = fanItems;
    else items = creatorItems;
    for (const item of items) {
      newSelectedKey = findSelectedKey(item);
      if (newSelectedKey) {
        break;
      }
    }
    if (newSelectedKey) {
      setSelectedKeys([newSelectedKey]);
    }
  }, [currentPathname]);

  return (
    <>
      {authUser ? (
        <>
          <div className={`${style['dashboard-wrapper']}`}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Layout className='main-layout'>
                <Sider
                  className='sidebar-main'
                  collapsible
                  collapsed={collapsed}
                  onCollapse={(value) => setCollapsed(value)}
                >
                  <Button
                    type='text'
                    icon={collapsed ? <CollapseArrow /> : <NotCollapseArrow />}
                    onClick={() => setCollapsed(!collapsed)}
                    className='collapsed-btn'
                  />
                  <Flex
                    gap='middle'
                    className='user-name-display'
                    align='center'
                  >
                    <div className='avatar-circle'>
                      <img
                        src={
                          'https://tagmango.com/staticassets/avatar-placeholder.png-1612857612139.png'
                        }
                        alt='Avatar'
                      />
                    </div>
                    <h1>Welcome, {'jhwvefhj'}</h1>
                  </Flex>
                  <div className='inner-sidebar'>
                    <Menu
                      defaultSelectedKeys={['1']}
                      selectedKeys={selectedKeys}
                      mode='inline'
                      className='sidebar'
                      style={{ padding: '0 8px', width: '100%', marginLeft: 0 }}
                    >
                      {userRole === 'fan_completed' &&
                        fanItems.map((item) =>
                          item.children ? (
                            <SubMenu
                              key={item.key}
                              icon={item.icon}
                              title={item.label}
                            >
                              {item.children.map((subItem) => (
                                <Menu.Item key={subItem.key}>
                                  {subItem.link ? (
                                    <Link href={subItem.link}>
                                      {subItem.label}
                                    </Link>
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

                      {userRole === 'creator_completed' &&
                        creatorItems.map((item) =>
                          item.children ? (
                            <SubMenu
                              key={item.key}
                              icon={item.icon}
                              title={item.label}
                            >
                              {item.children.map((subItem) => (
                                <Menu.Item key={subItem.key}>
                                  {subItem.link ? (
                                    <Link href={subItem.link}>
                                      {subItem.label}
                                    </Link>
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
                <Layout className='main-contain-layout'>
                  <Content>{props.children}</Content>
                </Layout>
              </Layout>
            </Space>
          </div>
        </>
      ) : (
        <>Loading....</>
      )}
    </>
  );
}
