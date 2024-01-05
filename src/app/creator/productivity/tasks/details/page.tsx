"use client";

import useAPI from "@/hooks/useApi";
import { CreatorsUserTasks } from "@/types";
import { Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BreadCrumbNav } from "../../../../../../components/common/breadcrumb";
import { PrimaryCard } from "../../../../../../components/common/card";
import { CustomTag } from "../../../../../../components/common/tag";
import PageTitle from "../../../../../../components/pagetitle";
import style from "../../../../../../style/creator.module.scss";

interface DataType {
  key: string;
  task: string;
  category: string;
  deadline: React.ReactNode;
  status: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Task",
    dataIndex: "task",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "age",
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "address",
    sorter: (a: any, b: any) => a.deadline - b.deadline,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const breadCrumbItems = [
  {
    title: "Back to Tasks",
    link: "/creator/productivity/tasks",
  },
];

const DetailsTaks = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [totalCompletedTask, setTotalCompletedTask] = useState<number>(0);
  const [totalPendingTask, setTotalPendingTask] = useState<number>(0);
  const [currentUserName, setCurrentUserName] = useState<string>("User");
  const { getCreatorTaskByUserId } = useAPI();
  const params = useSearchParams();
  const userId = params.get("id");

  useEffect(() => {
    fetchCreatorsUserTasks();
  }, []);

  const fetchCreatorsUserTasks = async () => {
    try {
      if (userId) {
        const taskData = await getCreatorTaskByUserId(userId);
        if ("id" in taskData) {
          setTotalCompletedTask(taskData?.completed);
          setTotalPendingTask(taskData?.pending);
          setCurrentUserName(taskData?.name);
          let transformedData = transformData(taskData);
          setData(transformedData);
          console.log(transformedData);
        }
      }
    } catch (error) {}
  };

  // Function to transform data
  const transformData = (data: CreatorsUserTasks): DataType[] => {
    return data.tasks.map((task) => ({
      key: task?.id,
      task: task?.title,
      category: task?.category?.title,
      deadline: `${formatDate(task?.endDate)} by ${formatTime(task?.endTime)}`,
      status: getStatusTag(task?.status),
    }));
  };

  // Helper function to format date
  const formatDate = (date: string | Date | null | undefined): string => {
    if (date) date = new Date(date);
    if (date instanceof Date) {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    if (date) {
      return date;
    }
    return "";
  };

  // Helper function to format time
  const formatTime = (time: string | Date | null): string => {
    if (time) time = new Date(time);
    if (time instanceof Date) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";

      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}:${formattedMinutes}${amOrPm}`;
    }
    return time || "";
  };

  // Helper function to get status tag
  const getStatusTag = (status: string): React.ReactNode => {
    const className = status === "pending" ? "pending-tag" : "completed-tag";
    const title = status === "pending" ? "Pending" : "Completed";
    return <CustomTag title={title} className={className} />;
  };

  return (
    <>
      <div
        className={`${style["creator-task-details-form"]} common-panel-wrapper`}
      >
        {/* Page Title */}
        <Row className="p-15">
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title={`${currentUserName}'s Tasks`} />
          </Col>
        </Row>
        <Row gutter={[12, 0]} className="p-r-b-l-15 ">
          {[
            {
              taskName: "Total Tasks Pending",
              count: totalPendingTask,
              status: "pending",
            },
            {
              taskName: "Total Tasks completed",
              count: totalCompletedTask,
              status: "completed",
            },
          ].map((ele, i) => (
            <Col key={i} span={6} className="count-card">
              <PrimaryCard
                title={ele.taskName}
                className={
                  ele.status == "completed" ? "completed-card" : "pending-card"
                }
              >
                <span style={{ margin: 0 }}>{ele.count}</span>
              </PrimaryCard>
            </Col>
          ))}
        </Row>

        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DetailsTaks;
