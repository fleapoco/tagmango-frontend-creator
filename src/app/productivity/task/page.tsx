"use client";
import type { RadioChangeEvent } from "antd";
import { Col, Row, Spin, Tabs } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import style from "../../../../style/task.module.scss";

import useAPI from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getTasksCounts,
  setTaskCounts,
} from "@/redux/reducers/task-counts.reducer";
import { getTaskStored, setTasks } from "@/redux/reducers/task.reducer";
import { GetTask } from "@/types";
import { PrimaryButton } from "../../../../components/common/button";
import { PrimaryCard } from "../../../../components/common/card";
import { AddIcon, SearchIcon } from "../../../../components/common/icons";
import { FormInput } from "../../../../components/form/input";
import PageTitle from "../../../../components/pagetitle";
import { CalendarTask } from "../../../../view/tasks/calendar";
import { TaskTable } from "../../../../view/tasks/tasktable";

const { TabPane } = Tabs;

const Task = () => {
  const dispatch = useAppDispatch();
  const param = useSearchParams();
  const tab = param.get("tab");

  console.log({ tab });
  const counts = useAppSelector(getTasksCounts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(searchQuery, 500);
  const { getTasks, taskCounts, deleteTask } = useAPI();

  const storedTasks: GetTask[] = useAppSelector(getTaskStored);

  const _getTasks = async () => {
    setIsLoading(true);
    try {
      const tasks = await getTasks({ query: debouncedSearchQuery });
      dispatch(setTasks(tasks));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskCounts = async () => {
    try {
      const counts = await taskCounts();
      dispatch(
        setTaskCounts({
          pending: counts.pending,
          completed: counts.completed,
          inProgress: counts.inProgress,
          total: counts.total,
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    getTaskCounts();
  }, [dispatch]);

  useEffect(() => {
    setDebouncedSearchQuery(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    _getTasks();
  }, [debouncedSearchQuery, dispatch]);

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/productivity/task/add-task");
  };

  const handleUpdateTakButton = (groupId: string) => {
    router.push(`/productivity/task/add-task?groupId=${groupId}`);
  };

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      _getTasks();
      getTaskCounts();
    } catch (error) {}
  };

  const handleTabChange = (key: string) => {
    if (key === "1") return router.push("/productivity/task?tab=task-calender");
    else if (key === "2") return router.push("/productivity/task?tab=my-task");
    else return null;
  };

  return (
    <>
      <Spin size="large" spinning={isLoading}>
        <div className={`${style["task-page"]} common-panel-wrapper`}>
          {/* Page Title */}
          <Row
            justify={"space-between"}
            style={{ alignItems: "center" }}
            className="p-15"
          >
            <Col span={12}>
              <PageTitle title="Tasks" />
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
              <PrimaryButton
                text="New Task"
                icon={<AddIcon />}
                variant="primary"
                onClick={handleButtonClick}
              />
            </Col>
          </Row>
          {/* Task Total Count Section */}
          <div className="gray-box task-count-wrapper p-15">
            <Row gutter={[12, 0]} className=" ">
              {[
                {
                  taskName: "Total Tasks completed",
                  count: counts.completed,
                },
                {
                  taskName: "Total Tasks Pending",
                  count: counts.pending,
                },
              ].map((ele, i) => (
                <Col key={i} span={6} className="count-card">
                  <PrimaryCard title={ele.taskName}>
                    <span style={{ margin: 0 }}>{ele.count}</span>
                  </PrimaryCard>
                </Col>
              ))}
            </Row>
          </div>
          {/* Calendar And My Task Tab Changing */}
          <Row>
            <Col span={24}>
              <Tabs
                defaultActiveKey="1"
                activeKey={tab === "my-task" ? "2" : "1"}
                onChange={(key: string) => handleTabChange(key)}
              >
                <TabPane tab="Calendar" key="1">
                  <div className="p-15">
                    <CalendarTask />
                  </div>
                </TabPane>
                <TabPane tab="My Tasks" key="2">
                  <div className="my-tasks-wrapper">
                    <Row className="p-15 table-searching-functionality">
                      <Col span={10}>
                        <FormInput
                          type="search"
                          variant="dark"
                          placeholder="Search"
                          icon={<SearchIcon />}
                          onChange={(e) => search(e)}
                          value={searchQuery}
                        />
                      </Col>
                    </Row>

                    <TaskTable
                      data={storedTasks}
                      handleDelete={(id) => handleDeleteTask(id)}
                      handlePagination={function (
                        page: number,
                        pageSize: number
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                      CountData={0}
                      dataPerPage={0}
                      currentPage={0}
                      handleUpdate={(groupId) => handleUpdateTakButton(groupId)}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
};
export default Task;
