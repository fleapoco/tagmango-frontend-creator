import { useState } from 'react';

import { CharitiesType } from '@/types';
import { Button, Col, Popconfirm, Popover, Row, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '../../components/common/button';
import { AddIcon } from '../../components/common/icons';
import PageTitle from '../../components/pagetitle';
import style from '../../style/task.module.scss';

// interface DataType {
//   createdAt: string;
//   category?: string | null;
//   amount: number;
//   organizationName: string;
//   status?: any;
// }

interface PropTypeForTable {
  data: CharitiesType[];
  handleDelete: (id: string) => void;
  handlePagination: (page: number, pageSize: number) => void;
  CountData: number;
  dataPerPage: number;
  currentPage: number;
}

const onChange: TableProps<Partial<CharitiesType>>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Charity = ({
  data,
  handleDelete,
  handlePagination,
  dataPerPage,
  CountData,
  currentPage,
}: PropTypeForTable) => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  const handlePopoverOpen = (index: number) => {
    setOpenPopoverIndex(index === openPopoverIndex ? null : index);
  };

  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/charity/addcharity');
  };

  const columns: ColumnsType<Partial<CharitiesType>> = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (value, record) => {
        return dayjs(value).format('DD-MM-YYYY');
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Organization Name',
      dataIndex: 'organizationName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => {
        return 'completed';
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => (
        <Popover
          placement='top'
          content={
            <>
              <Button
                type='text'
                onClick={() => handlePopoverOpen(index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  marginBottom: '8px',
                }}
              >
                Edit
              </Button>
              <Popconfirm
                onConfirm={() => handleDelete(record?.id ?? '')}
                title='Are you sure to delete?'
                okText='Yes'
                cancelText='No'
              >
                <Button
                  style={{ width: '100%', textAlign: 'left' }}
                  type='text'
                >
                  Delete
                </Button>
              </Popconfirm>
            </>
          }
          trigger='click'
          open={openPopoverIndex === index}
          onOpenChange={(visible) => {
            if (!visible) {
              setOpenPopoverIndex(null);
            }
          }}
        >
          <PrimaryButton
            text=''
            variant='info'
            onClick={() => handlePopoverOpen(index)}
          />
        </Popover>
      ),
    },
  ];

  return (
    <>
      <div className={`${style['charity-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={12}>
            <PageTitle title='Charity' />
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryButton
              text='Add Data'
              icon={<AddIcon />}
              variant='dark'
              onClick={handleButtonClick}
            />
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </>
  );
};
