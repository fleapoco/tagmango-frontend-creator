import { useState } from "react";

import { CategoryType, GetTask, TaskFrequency, TaskType } from "@/types";
import { Button, Popconfirm, Popover, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { PrimaryButton } from "../../../components/common/button";
import { TableNoData } from "../../../components/common/tablenodata";

interface DataType {
  id?: string;
  title: string | null;
  category?: CategoryType | null;
  endDate?: string | null;
  startDate?: string | null;
  status: string;
  groupId?: string;
  type?: TaskType;
  frequency: TaskFrequency;
}

interface PropTypeForTable {
  data: GetTask[];
  handleDelete: (id: string) => void;
  handleUpdate: (groupId: string) => void;
  handlePagination: (page: number, pageSize: number) => void;
  CountData: number;
  dataPerPage: number;
  currentPage: number;
  searchQuery?: string;
  setSearchQuery?: (searchQuery: string) => void;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const TaskTable = ({
  data,
  handleDelete,
  handleUpdate,
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
      title: "Task",
      dataIndex: "title",
    },

    {
      title: "Category",
      dataIndex: "category",
      render: (value, record) => {
        return record.category?.title ?? "";
      },
    },

    {
      title: "Type",
      dataIndex: "type",
      render: (value, record) => {
        return value;
      },
    },

    {
      title: "Frequency",
      dataIndex: "frequency",
      render: (value, record) => {
        return value;
      },
    },

    {
      title: "Deadline",
      dataIndex: "startDate",
      render: (value, record) => {
        if (record.type === TaskType.ONE_TIME) {
          return dayjs(record.startDate).format("DD MMM YYYY");
        } else if (record.type === TaskType.RECURRING) {
          return `from ${dayjs(record.startDate).format(
            "DD MMM YYYY"
          )}- till ${dayjs(record.endDate).format("DD MMM YYYY")}`;
        }
      },
    },

    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      align: "right",
      render: (text, record, index) => (
        <Popover
          placement="top"
          className="action-btn"
          content={
            <>
              <Button
                type="text"
                onClick={() => handleUpdate(record.groupId!)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginBottom: "8px",
                }}
              >
                Edit
              </Button>

              <Popconfirm
                onConfirm={() => handleDelete(record?.groupId ?? "")}
                title="Are you sure to delete?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                >
                  Delete
                </Button>
              </Popconfirm>
            </>
          }
          trigger="click"
          open={openPopoverIndex === index}
          onOpenChange={(visible) => {
            if (!visible) {
              setOpenPopoverIndex(null);
            }
          }}
        >
          <PrimaryButton
            text=""
            variant="info"
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
        className="table-main"
        pagination={{ pageSize: 20 }}
        scroll={{ y: 400, x: 900 }}
        locale={{ emptyText: <TableNoData /> }}
      />
    </>
  );
};
