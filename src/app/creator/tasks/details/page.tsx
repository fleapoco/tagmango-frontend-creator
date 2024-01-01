'use client';

import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryCard } from '../../../../../components/common/card';
import { CustomTag } from '../../../../../components/common/tag';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

interface DataType {
  key: string;
  task: string;
  category: string;
  deadline: React.ReactNode;
  status: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'age',
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'address',
    sorter: (a: any, b: any) => a.deadline - b.deadline,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const data: DataType[] = [
  {
    key: '1',
    task: 'Task name here',
    category: 'Selling',
    deadline: '08/12/2023 by 6:00PM',
    status: (
      <>
        {/* Pending Task */}
        <CustomTag title='Pending' color='#FFFF00' className='pending-tag' />
        {/* Completed Tag */}
        <CustomTag title='Completed' color='#87d068' />
      </>
    ),
  },
];

const breadCrumbItems = [
  {
    title: 'Back to Tasks',
    link: '/creator/tasks',
  },
];

const DetailsTaks = () => {
  return (
    <>
      <div
        className={`${style['creator-task-details-form']} common-panel-wrapper`}
      >
        {/* Page Title */}
        <Row className='p-15'>
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title='Chetan Mane Tasks' />
          </Col>
        </Row>
        <Row gutter={[12, 0]} className='p-r-b-l-15 '>
          {[
            {
              taskName: 'Total Tasks Pending',
              count: 34,
            },
            {
              taskName: 'Total Tasks completed',
              count: 2,
            },
          ].map((ele, i) => (
            <Col key={i} span={6} className='count-card'>
              <PrimaryCard title={ele.taskName}>
                <span style={{ margin: 0 }}>{ele.count}</span>
              </PrimaryCard>
            </Col>
          ))}
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

export default DetailsTaks;
