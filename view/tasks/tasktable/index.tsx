import { useState } from "react";

import { GetTask } from "@/types/fetchCall";
import { Popover, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { PrimaryButton } from "../../../components/common/button";
import { FormInput } from "../../../components/form/input";

interface DataType {
  id: string;
  title: string | null;
  category: string | null;
  endDate?: string;
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
      dataIndex: "endDate",
      render: (value, record) => {
        return dayjs(value).format("MM/DD/YYYY [by] hh:mmA");
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
              <span
                onClick={() => handlePopoverOpen(index)}
                style={{ display: "block" }}
              >
                Delete
              </span>
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

  // const data: DataType[] = [
  //   {
  //     key: "1",
  //     task: "Task name here Task name here ",
  //     category: "Selling",
  //     deadline: "08/12/2020 by 06:00PM",
  //     status: <PrimaryButton text="Mark as complete" variant="secondary" />,
  //   },
  //   {
  //     key: "2",
  //     task: "Task name here",
  //     category: "Selling",
  //     deadline: "08/12/2020 by 06:00PM",
  //     status: <PrimaryButton text="Mark as complete" variant="secondary" />,
  //   },
  //   {
  //     key: "3",
  //     task: "Task name here",
  //     category: "Selling",
  //     deadline: "01/12/2020 by 06:00PM",
  //     status: <CustomTag variant="success" title="Completed" />,
  //   },
  //   {
  //     key: "4",
  //     task: "Task name here",
  //     category: "Selling",
  //     deadline: "28/12/2020 by 06:00PM",
  //     status: <CustomTag variant="success" title="Completed" />,
  //   },
  // ];
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
