'use client';

import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '../../../../../components/common/button';
import { UserName } from '../../../../../components/common/username';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

interface DataType {
  key: string;
  user: React.ReactNode;
  totaltaskscompleted: number;
  totaltaskspending: number;
}

const TasksPage = () => {
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
      render: (record) => (
        <PrimaryButton
          text='View Details'
          variant='secondary'
          onClick={() => handleButtonClick(record.key)}
        />
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      user: <UserName username='Chetan Mane' />,
      totaltaskscompleted: 32,
      totaltaskspending: 4,
    },
  ];

  const router = useRouter();

  const handleButtonClick = (key: string): void => {
    router.push('/creator/productivity/tasks/details');
  };
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
function handleButtonClick(key: any): void {
  throw new Error('Function not implemented.');
}
