import { useState } from "react";

import { GetTask } from "@/types";
import { Popconfirm, Popover, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { PrimaryButton } from "../../../components/common/button";

interface DataType {
  id?: string;
  title: string | null;
  category: string | null;
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
    },
    {
      title: "Deadline",
      dataIndex: "startDate",
      render: (value, record) => {
        return dayjs(value).format("MM/DD/YYYY");
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
      render: (text, record, index) => (
        <Popover
          content={
            <div style={{ width: "130px", padding: "5px" }}>
              <span
                onClick={() => handlePopoverOpen(index)}
                style={{ display: "block", marginBottom: "12px" }}
              >
                Edit
              </span>
              <Popconfirm
                onConfirm={() => handleDelete(record?.id ?? "")}
                title="Are you sure to delete?"
                okText="Yes"
                cancelText="No"
              >
                Delete
              </Popconfirm>
            </div>
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
      <div style={{ background: "#fff", padding: "15px" }}>
        {/* <FormInput type="search" placeholder="Search" value={""} /> */}
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </>
  );
};

{
  /* <DatePicker
                style={{ width: "100%", padding: "7.5px 12px" }}
                onChange={(date, dateString) =>
                  setCreateTaskFormData({
                    ...createTaskFormData,
                    startDate: dateString,
                  })
                }
              />
              <TimePicker
                style={{ width: "100%", padding: "7.5px 12px" }}
                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                onChange={(time, timeString) =>
                  setCreateTaskFormData({
                    ...createTaskFormData,
                    startTime: timeString,
                  })
                } */
}
