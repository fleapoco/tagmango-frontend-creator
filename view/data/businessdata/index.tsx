import { useState } from "react";

import { DataAnalyticsTypes } from "@/types";
import { Button, Popconfirm, Popover, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { PrimaryButton } from "../../../components/common/button";

interface DataType {
  id: string;
  month: string;
  revenueEarned: number;
  adSpends: number;
  costPerLead: number;
  totalLeadsGenerated: number;
  totalPaidCustomers: number;
  vipGroupSize: number;
  adSpendsReturn: number;
}

interface PropTypeForTable {
  data: Partial<DataAnalyticsTypes[]>;
  handleDelete: (id: string) => void;
  handleUpdate: (record: DataAnalyticsTypes) => void;
  handlePagination: (page: number, pageSize: number) => void;
  CountData: number;
  dataPerPage: number;
  currentPage: number;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const BusinessData = ({
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
      title: "Month",
      dataIndex: "month",
      render: (value, record) => {
        return dayjs(value).format("YYYY-MM");
      },
    },
    {
      title: "Total Revenue Earned",
      dataIndex: "revenueEarned",
    },
    {
      title: "Total Ad Spends",
      dataIndex: "adSpends",
    },
    {
      title: "Average Cost/Lead",
      dataIndex: "costPerLead",
    },
    {
      title: "Total Leads Generated",
      dataIndex: "totalLeadsGenerated",
    },
    {
      title: "Total Paid Customers",
      dataIndex: "totalPaidCustomers",
    },
    {
      title: "Total Group Size",
      dataIndex: "vipGroupSize",
    },
    {
      title: "ROAS",
      dataIndex: "adSpendsReturn",
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
      <div style={{ background: "#fff", padding: "15px" }}>
        {/* <FormInput type="search" placeholder="Search" /> */}
        <Table columns={columns} dataSource={data as any} onChange={onChange} />
      </div>
    </>
  );
};
