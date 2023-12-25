import { useState } from 'react';

import { CategoryType, GetTask } from '@/types';
import { Button, Popconfirm, Popover, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { PrimaryButton } from '../../../components/common/button';

interface DataType {
  id?: string;
  title: string | null;
  category: CategoryType | null;
  endDate?: string | null;
  status: string;
}

interface PropTypeForTable {
  data: GetTask[];
  handleDelete: (id: string) => void;
  handlePagination: (page: number, pageSize: number) => void;
  CountData: number;
  dataPerPage: number;
  currentPage: number;
  searchQuery?: string;
  setSearchQuery?: (searchQuery: string) => void;
}

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const TaskTable = ({
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'Task',
      dataIndex: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (value, record) => {
        return record.category?.title;
      },
    },
    {
      title: 'Deadline',
      dataIndex: 'startDate',
      render: (value, record) => {
        return dayjs(value).format('MM/DD/YYYY');
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
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
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        className='table-main'
      />
    </>
  );
};
