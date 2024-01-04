'use client';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  date: React.ReactNode;
  category: string;
  amount: number;
  organization: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (value, record) => {
      return `₹${value.toLocaleString('en-IN')}`;
    },
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    key: 'organization',
  },
];

const data: DataType[] = [
  {
    key: '1',
    date: '07/12/2023',
    category: 'Food Relief',
    amount: 4000,
    organization: 'Ketro India',
  },
];

const breadCrumbItems = [
  {
    title: 'Back to Quizzes',
    link: '/creator/quizzes',
  },
];

const MyCharityTable = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default MyCharityTable;
