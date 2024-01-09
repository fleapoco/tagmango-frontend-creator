"use client";

import Loading from "@/app/loading";
import useAPI from "@/hooks/useApi";
import { Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BreadCrumbNav } from "../../../../../../components/common/breadcrumb";
import { CustomTag } from "../../../../../../components/common/tag";
import PageTitle from "../../../../../../components/pagetitle";
import style from "../../../../../../style/creator.module.scss";

interface DataType {
  key: string;
  user: string;
  status: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: "User",
    dataIndex: "user",
    key: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const data: DataType[] = [
  {
    key: "1",
    user: "Chetan Mane",
    status: (
      <>
        {/* Pending Task */}
        <CustomTag title="Pending" color="#FFFF00" className="pending-tag" />
        {/* Completed Tag */}
        <CustomTag title="Completed" color="#87d068" />
      </>
    ),
  },
];

const breadCrumbItems = [
  {
    title: "Back to Habits Tracker",
    link: "/creator/productivity/habits",
  },
];

const DetailsTaks = () => {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [habitTitle, setHabitTitle] = useState("");
  const [habitDate, setHabitDate] = useState("");
  const [habitUserData, setHabitUserData] = useState([]);
  const { getHabitDetailsById, getHabitSubmissionDetailsById } = useAPI();
  const habitId = params.get("id");

  useEffect(() => {
    if (habitId) {
      fetchHabitDetails();
      fetchHabitSubmissionData();
    }
  }, [habitId]);

  const fetchHabitDetails = async () => {
    setIsLoading(true);
    try {
      let data = await getHabitDetailsById(habitId!);
      if ("title" in data) {
        setHabitTitle(data.title);
        setHabitDate(dayjs(data.date).locale("en").format("DD MMM YYYY"));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHabitSubmissionData = async () => {
    setIsLoading(true);
    try {
      let data = await getHabitSubmissionDetailsById(habitId!);
      if (data && Array.isArray(data)) setHabitUserData(transformData(data));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Function to transform data
  const transformData = (data: any) => {
    return data.map((habit: any) => ({
      key: habit?.id,
      user: habit.user.name,
      status: getStatusTag(habit.status),
    }));
  };

  // Helper function to get status tag
  const getStatusTag = (status: string) => {
    if (status === "pending") {
      return (
        <>
          {/* Pending Task */}
          <CustomTag title="Pending" color="#FFFF00" className="pending-tag" />
        </>
      );
    }
    return (
      <>
        {/* Completed Tag */}
        <CustomTag title="Completed" color="#87d068" />
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading pageloader={true} loading={isLoading} />
      ) : (
        <div
          className={`${style["creator-task-details-form"]} common-panel-wrapper`}
        >
          {/* Page Title */}
          <Row className="p-15">
            <Col span={24}>
              <BreadCrumbNav item={breadCrumbItems} />
              <PageTitle title={`${habitDate} - ${habitTitle}`} />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Table
                loading={isLoading}
                columns={columns}
                dataSource={habitUserData}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default DetailsTaks;
