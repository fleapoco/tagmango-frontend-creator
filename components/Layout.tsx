'use client';
import useApi from '@/hooks/useApi';
import type { MenuProps } from 'antd';
import { Flex, Layout, Menu, Space, Typography } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  MdAdsClick,
  MdCastForEducation,
  MdDashboard,
  MdDatasetLinked,
  MdEmojiEvents,
  MdOutlineQuiz,
} from 'react-icons/md';

import { useAppDispatch } from '@/hooks/useRedux';
import { Analytics } from './common/icons';
import { Header } from './header';
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
};

const items: ItemType[] = [
  {
    key: '1',
    label: 'Dashboard',
    link: '/',
    icon: <MdDashboard size={20} />,
  },
  {
    key: 'sub1',
    label: 'Productivity',
    icon: <Analytics />,
    children: [
      {
        key: 'sub2',
        label: 'Habits',
        link: '/productivity/habit',
      },
      {
        key: 'sub3',
        label: 'Tasks',
        link: '/productivity/task',
      },
    ],
  },
  {
    key: '2',
    label: 'Data',
    icon: <MdDatasetLinked size={20} />,
    link: '/data',
  },
  {
    key: '3',
    label: 'Events',
    icon: <MdEmojiEvents size={20} />,
    link: '/events',
  },
  {
    key: '4',
    label: 'Charity',
    icon: <Analytics />,
    link: '/charity',
  },
  {
    key: '5',
    label: 'Quizzes',
    icon: <MdOutlineQuiz size={20} />,
    link: '/quizzes',
  },
  {
    key: '6',
    label: 'Degree',
    icon: <MdCastForEducation size={20} />,
    link: '/degree',
  },
  {
    key: '7',
    label: 'Achievement',
    icon: <MdAdsClick size={20} />,
    link: '/achievement',
  },
];

interface Props {
  children: React.ReactNode;
  // userDetails?: UserDetails;
}

export default function PageLayout(props: Props) {
  // const userDetails = useAppSelector(getUserStored);
  const dispatch = useAppDispatch();

  const { getCharities } = useApi();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const currentPathname = usePathname();

  // useEffect(() => {
  //   if (props.userDetails) dispatch(setUser(props.userDetails));
  // }, [dispatch, props.userDetails]);

  // useEffect(() => {
  //   const key = items.find((item) => item.link === currentPathname)?.key;
  //   console.log(key);

  //   if (key) {
  //     setSelectedKeys([key]);
  //   }
  // }, [currentPathname]);\

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
      <div className={`${style['dashboard-wrapper']}`}>
        <Header />
        <Space
          direction='vertical'
          style={{ width: '100%', marginTop: '60px' }}
        >
          <Layout className='main-layout'>
            <Sider className='sidebar-main'>
              <Flex gap='middle' className='user-name-display' align='center'>
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
            <Layout className='main-contain-layout'>
              <Content>{props.children}</Content>
            </Layout>
          </Layout>
        </Space>
      </div>
    </>
  );
}
