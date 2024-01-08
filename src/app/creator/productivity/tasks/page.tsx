"use client";

import useAPI from "@/hooks/useApi";
import { CreatorAllUsersTasks } from "@/types";
import { Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../../../components/common/button";
import { UserName } from "../../../../../components/common/username";
import PageTitle from "../../../../../components/pagetitle";
import style from "../../../../../style/creator.module.scss";

interface DataType {
  key: string;
  user: React.ReactNode;
  totaltaskscompleted: number;
  totaltaskspending: number;
}

const TasksPage = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "User",
      dataIndex: "user",
      key: "name",
    },
    {
      title: "Total Tasks Completed",
      dataIndex: "totaltaskscompleted",
      key: "age",
    },
    {
      title: "Total Tasks Pending",
      dataIndex: "totaltaskspending",
      key: "address",
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <PrimaryButton
          text="View Details"
          variant="secondary"
          onClick={() => handleButtonClick(record.key)}
        />
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType[]>([]);
  const { getCreatorTasks } = useAPI();
  const router = useRouter();

  useEffect(() => {
    fetchAllUserTasks();
  }, []);

  const fetchAllUserTasks = async () => {
    setIsLoading(true);
    try {
      const taskData = await getCreatorTasks();
      if (taskData && Array.isArray(taskData)) {
        let transformedData = transformData(taskData);
        setData(transformedData);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const transformData = (data: CreatorAllUsersTasks[]): DataType[] => {
    return data.map((task) => ({
      key: task?.id,
      user: <UserName username={task?.name} />,
      totaltaskscompleted: task?.completed,
      totaltaskspending: task?.pending,
    }));
  };

  const handleButtonClick = (key: string): void => {
    router.push(`/creator/productivity/tasks/details?id=${key}`);
  };

  return (
    <>
      <div className={`${style["event-tasks-page"]} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center" }}
          className="p-15"
        >
          <Col span={24}>
            <PageTitle title="Tasks overview" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table loading={isLoading} columns={columns} dataSource={data} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default TasksPage;
