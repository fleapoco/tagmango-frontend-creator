'use client';

import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BreadCrumbNav } from '../../../../../../components/common/breadcrumb';
import { CustomTag } from '../../../../../../components/common/tag';
import PageTitle from '../../../../../../components/pagetitle';
import style from '../../../../../../style/creator.module.scss';

interface DataType {
  key: string;
  user: string;
  status: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'name',
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
    user: 'Chetan Mane',
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
    title: 'Back to Habits Tracker',
    link: '/creator/productivity/habits',
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
            <PageTitle title='31st Dec 2023 - Listen -Strangest Secret' />
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
