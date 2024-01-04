'use client';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Flex, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserAvatar } from '../../../../components/common/avatar';
import { FormSelect } from '../../../../components/form/select';

interface DataType {
  key: string;
  rank: number;
  user: React.ReactNode;
  badge: React.ReactNode;
  points: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'name',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'name',
  },
  {
    title: 'Badge',
    dataIndex: 'badge',
    key: 'name',
  },
  {
    title: 'Points',
    dataIndex: 'points',
    key: 'name',
  },
];

const data: DataType[] = [
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <UserAvatar shape='circle' username='C' />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <UserAvatar shape='circle' username='C' />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <UserAvatar shape='circle' username='C' />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <UserAvatar shape='circle' username='C' />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <UserAvatar shape='circle' username='C' />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <UserAvatar shape='circle' username='C' />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <Avatar size={40} icon={<UserOutlined />} />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
  {
    key: '1',
    rank: 1,
    user: (
      <>
        <Flex gap={15} align='center' className='avatar-name'>
          <Avatar size={40} icon={<UserOutlined />} />
          <h5>Chetan Mane</h5>
        </Flex>
      </>
    ),
    badge: (
      <>
        <Avatar.Group shape='square'>
          <Avatar style={{ backgroundColor: '#fde3cf' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }} />
          <Avatar style={{ backgroundColor: '#87d068' }} />
          <Avatar style={{ backgroundColor: '#1677ff' }} />
        </Avatar.Group>
      </>
    ),
    points: 23,
  },
];

export const DashboardMembers = () => {
  return (
    <>
      <div className='creator-dashboard-table'>
        <div className='heading-wrapper'>
          <h4>Members</h4>

          <Row>
            <Col span={6}>
              <div className='filter-wrapper form-group'>
                <label>Filter By Badges</label>
                <FormSelect
                  handleChange={function (value: string): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};
