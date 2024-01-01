'use client';

import { Col, Row, Table } from 'antd';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/creator.module.scss';

import type { ColumnsType } from 'antd/es/table';
import { PrimaryButton } from '../../../../components/common/button';

interface DataType {
  key: string;
  user: string;
  totaltaskscompleted: number;
  totaltaskspending: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'name',
  },
  {
    title: 'Total Tasks Completed',
    dataIndex: 'totaltaskscompleted',
    key: 'age',
  },
  {
    title: 'Total Tasks Pending',
    dataIndex: 'totaltaskspending',
    key: 'address',
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <PrimaryButton text='View Details' variant='secondary' />
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    user: 'Chetan Mane',
    totaltaskscompleted: 32,
    totaltaskspending: 4,
  },
];

const TasksPage = () => {
  return (
    <>
      <div className={`${style['event-tasks-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={24}>
            <PageTitle title='Tasks overview' />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default TasksPage;
