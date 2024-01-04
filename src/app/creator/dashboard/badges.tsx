'use client';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserAvatar } from '../../../../components/common/avatar';

interface DataType {
  key: string;
  logo: React.ReactNode;
  name: string;
  member: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Logo',
    dataIndex: 'logo',
    key: 'name',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Member',
    dataIndex: 'member',
    key: 'name',
  },
];

const data: DataType[] = [
  {
    key: '1',
    logo: (
      <>
        <UserAvatar shape='square' />
      </>
    ),
    name: 'Badge 1',
    member: 23,
  },
  {
    key: '2',
    logo: (
      <>
        <UserAvatar shape='square' />
      </>
    ),
    name: 'Badge 2',
    member: 23,
  },
];

export const DashboardBadges = () => {
  return (
    <>
      <div className='creator-dashboard-table'>
        <div className='heading-wrapper'>
          <h4>Badges</h4>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};
