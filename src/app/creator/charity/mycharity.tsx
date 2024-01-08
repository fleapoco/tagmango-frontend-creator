"use client";

import { Button, Col, DatePicker, Popconfirm, Popover, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import useAPI from "@/hooks/useApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { setCharity } from "@/redux/reducers/charity.reducer";
import { CategoryType } from "@/types";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../../components/common/button";
const { RangePicker } = DatePicker;

interface MyCharityTableType {
  data?: DataType[];
  fetchMyCharities?: (
    myCharitiesStartDate?: string | null,
    myCharitiesEndDate?: string | null
  ) => void;
  isLoading: boolean;
}

interface DataType {
  key: string;
  date: string;
  category: CategoryType | null;
  amount: number;
  organization: string;
}

const MyCharityTable = ({
  data,
  fetchMyCharities,
  isLoading,
}: MyCharityTableType) => {
  const dispatch = useAppDispatch();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [myCharitiesStartDate, setMyCharitiesStartDate] = useState<
    string | null
  >(null);
  const [myCharitiesEndDate, setMyCharitiesEndDate] = useState<string | null>(
    null
  );
  const router = useRouter();
  const { deleteCharity } = useAPI();

  const handlePopoverOpen = (index: number) => {
    setOpenPopoverIndex(index === openPopoverIndex ? null : index);
  };

  useEffect(() => {
    if (fetchMyCharities)
      fetchMyCharities(myCharitiesStartDate, myCharitiesEndDate);
  }, [myCharitiesStartDate, myCharitiesEndDate]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCharity(id);
    } catch (error) {
    } finally {
      if (fetchMyCharities) fetchMyCharities();
    }
  };

  const handleUpdate = (record: DataType) => {
    const data = {
      id: record.key,
      organizationName: record.organization,
      amount: record.amount,
      category: record.category,
      date: record.date,
    };
    dispatch(setCharity(data));
    router.push("/creator/charity/addcharity?type=update");
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates.length === 2) {
      setMyCharitiesStartDate(dates[0]?.toISOString() || null);
      setMyCharitiesEndDate(dates[1]?.toISOString() || null);
    } else {
      setMyCharitiesStartDate(null);
      setMyCharitiesEndDate(null);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value, record) => {
        return dayjs(value).format("DD-MM-YYYY");
      },
      width: 200,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (value, record) => {
        return record.category?.title;
      },
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
    {
      title: "",
      dataIndex: "",
      key: "action",
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
                onConfirm={() => handleDelete(record?.key ?? "")}
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
      <div className="filter-options p-15">
        <Row>
          <Col span={18}>
            {/* <Flex gap={16} align="center" style={{ width: "100%" }}>
              <FormInput placeholder="S	earch" />
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
                myCharitiesStartDate ? dayjs(myCharitiesStartDate) : null,
                myCharitiesEndDate ? dayjs(myCharitiesEndDate) : null,
              ]}
              onChange={handleDateChange}
            />
          </Col>
        </Row>
      </div>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </>
  );
};

export default MyCharityTable;
