import { useState } from "react";

import { DataAnalyticsTypes } from "@/types";
import { Button, Popconfirm, Popover, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { PrimaryButton } from "../../../components/common/button";
import { TableNoData } from "../../../components/common/tablenodata";

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
        return dayjs(value).format("MMM YYYY");
      },
    },
    {
      title: "Total Revenue Earned",
      dataIndex: "revenueEarned",
      width: 150,
    },
    {
      title: "Total Ad Spends",
      dataIndex: "adSpends",
      width: 150,
    },
    {
      title: "Average Cost/Lead",
      dataIndex: "costPerLead",
      width: 150,
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
      fixed: "right",
      width: 80,
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
      <div style={{ paddingTop: "15px" }}>
        <Table
          columns={columns}
          dataSource={data as any}
          onChange={onChange}
          pagination={{ pageSize: 20 }}
          scroll={{ x: 1200 }}
          locale={{ emptyText: <TableNoData /> }}
        />
      </div>
    </>
  );
};
