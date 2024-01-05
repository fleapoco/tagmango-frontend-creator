"use client";

import { Col, Flex, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormInput } from "../../../../components/form/input";
import { FormSelect } from "../../../../components/form/select";

interface UsersCharityType {
  data?: DataType[];
}

interface DataType {
  key: string;
  date: React.ReactNode;
  user: React.ReactNode;
  category: string;
  amount: number;
  organization: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "name",
    width: 200,
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    width: 350,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 350,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (value, record) => {
      return `₹${value.toLocaleString("en-IN")}`;
    },
    width: 300,
  },
  {
    title: "Organization",
    dataIndex: "organization",
    key: "organization",
    width: 300,
  },
];

const UsersCharity = ({ data }: UsersCharityType) => {
  return (
    <>
      <div className="filter-options p-15">
        <Row>
          <Col span={18}>
            <Flex gap={16} align="center" style={{ width: "100%" }}>
              <FormInput placeholder="Search" />
              Filter By
              <FormSelect
                handleChange={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Flex>
          </Col>
          <Col span={6}>
            <FormInput placeholder="Select Date" type="date" />
          </Col>
        </Row>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UsersCharity;
