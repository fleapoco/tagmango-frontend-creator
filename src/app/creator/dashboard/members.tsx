'use client';

import { Avatar, Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserName } from '../../../../components/common/username';
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
        <UserName username='Fleapo Team' />
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
        <UserName username='Fleapo Team' />
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
        <UserName username='Fleapo Team' />
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
        <UserName username='Fleapo Team' />
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
        <UserName username='Fleapo Team' />
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
        <UserName username='Fleapo Team' />
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
        <UserName username='Fleapo Team' />
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
        <UserName username='Fleapo Team' />
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
