"use client";

import { Col, DatePicker, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

interface UsersCharityType {
  data?: DataType[];
  fetchUsersCharities?: (
    usersCharitiesStartDate?: string | null,
    usersCharitiesEndDate?: string | null
  ) => void;
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

const UsersCharity = ({ data, fetchUsersCharities }: UsersCharityType) => {
  const [usersCharitiesStartDate, setUsersCharitiesStartDate] = useState<
    string | null
  >(null);
  const [usersCharitiesEndDate, setUsersCharitiesEndDate] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (fetchUsersCharities)
      fetchUsersCharities(usersCharitiesStartDate, usersCharitiesEndDate);
  }, [usersCharitiesStartDate, usersCharitiesEndDate]);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates.length === 2) {
      setUsersCharitiesStartDate(dates[0]?.toISOString() || null);
      setUsersCharitiesEndDate(dates[1]?.toISOString() || null);
    } else {
      setUsersCharitiesStartDate(null);
      setUsersCharitiesEndDate(null);
    }
  };

  return (
    <>
      <div className="filter-options p-15">
        <Row>
          <Col span={18}>
            {/* <Flex gap={16} align="center" style={{ width: "100%" }}>
              <FormInput placeholder="Search" />
              Filter By
              <FormSelect
                handleChange={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Flex> */}
          </Col>
          <Col span={6}>
            {/* <FormInput placeholder="Select Date" type="date" /> */}
            <RangePicker
              value={[
                usersCharitiesStartDate ? dayjs(usersCharitiesStartDate) : null,
                usersCharitiesEndDate ? dayjs(usersCharitiesEndDate) : null,
              ]}
              onChange={handleDateChange}
            />
          </Col>
        </Row>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UsersCharity;
