'use client';

import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../components/common/button';
import { CustomTag } from '../../../../../components/common/tag';
import { UserName } from '../../../../../components/common/username';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

interface DataType {
  key: string;
  subscriber: React.ReactNode;
  submissionTime: string;
  status: React.ReactNode;
}

const DetailsTaks = () => {
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
      render: (record) => (
        <PrimaryButton
          text='Review Now'
          variant='secondary'
          onClick={() => handleButtonClick(record.key)}
        />
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      subscriber: (
        <>
          <UserName username='Chetan Mane' />
        </>
      ),
      submissionTime: '13/10/2023, 6:00PM',
      status: (
        <>
          {/* Pending Task */}
          <CustomTag title='NOT REVIEWED YET' className='pending-tag' />
        </>
      ),
    },
    {
      key: '2',
      subscriber: (
        <>
          <UserName username='Chetan Mane' />
        </>
      ),
      submissionTime: '13/10/2023, 6:00PM',
      status: (
        <>
          {/* Completed Tag */}
          <CustomTag title='REVIEWED' className='completed-tag' />
        </>
      ),
    },
  ];

  const router = useRouter();

  const handleButtonClick = (key: string): void => {
    router.push('/creator/quizzes/submittedquiz');
  };

  const breadCrumbItems = [
    {
      title: 'Back to Quizzes',
      link: '/creator/quizzes',
    },
  ];
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
