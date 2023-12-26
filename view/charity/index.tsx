import { useState } from "react";

import { CharitiesType } from "@/types";
import { Button, Popconfirm, Popover, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "../../components/common/button";

interface PropTypeForTable {
  data: CharitiesType[];
  handleDelete: (id: string) => void;
  handleUpdate: (record: CharitiesType) => void;
  handlePagination: (page: number, pageSize: number) => void;
  CountData: number;
  dataPerPage: number;
  currentPage: number;
}

export const Charity = ({
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

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/charity/addcharity");
  };

  const columns: ColumnsType<CharitiesType> = [
    {
      title: "Date",
      dataIndex: "date",
      render: (value, record) => {
        return dayjs(value).format("DD-MM-YYYY");
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (value, record) => {
        return record.category?.title;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Organization Name",
      dataIndex: "organizationName",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: () => {
        return "completed";
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => (
        <Popover
          placement="top"
          content={
            <>
              <Button
                type="text"
                onClick={() => handleUpdate(record)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginBottom: "8px",
                }}
              >
                Edit
              </Button>
              <Popconfirm
                onConfirm={() => handleDelete(record?.id ?? "")}
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
        // onChange={onChange}
      />
    </>
  );
};
