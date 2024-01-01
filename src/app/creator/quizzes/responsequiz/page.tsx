'use client';

import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../components/common/button';
import { CustomTag } from '../../../../../components/common/tag';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

interface DataType {
  key: string;
  subscriber: string;
  submissionTime: string;
  status: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Subscriber',
    dataIndex: 'subscriber',
    key: 'name',
  },
  {
    title: 'Submission Time',
    dataIndex: 'submissionTime',
    key: 'age',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'address',
  },
  {
    title: '',
    key: 'action',
    render: (record) => <PrimaryButton text='Review Now' variant='secondary' />,
  },
];

const data: DataType[] = [
  {
    key: '1',
    subscriber: 'Chetan Mane',
    submissionTime: '13/10/2023, 6:00PM',
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
            <PageTitle title='Responses for Quiz Title' />
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

export default DetailsTaks;
