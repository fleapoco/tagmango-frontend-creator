"use client";

import { useEffect, useState } from "react";

import type { RadioChangeEvent } from "antd";
import { Col, Flex, Radio, Row, Space, message } from "antd";
import PageTitle from "../../components/pagetitle";

import { initialTaskState } from "@/empty-state-objects/empty";
import { daysArray, daysOfMonthDropdown } from "@/empty-state-objects/helpers";
import useAPI from "@/hooks/useApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTasks } from "@/redux/reducers/task.reducer";
import { GetTask, TaskFrequency, TaskType, TypeCategory } from "@/types";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { BreadCrumbNav } from "../../components/common/breadcrumb";
import { PrimaryButton } from "../../components/common/button";
import { FormInput } from "../../components/form/input";
import { FormSelect } from "../../components/form/select";
const frequencyArray = ["daily", "bi-weekly", "weekly", "monthly"];
const typeArray = ["one-time", "recurring"];

export const CreateTask = () => {
  const router = useRouter();
  const params = useSearchParams();

  const groupId = params?.get("groupId");

  const {
    createTask,
    getTasks,
    getCategories,
    getTaskByGroupId,
    updateTaskByGroupId,
  } = useAPI();

  const [loading, setLoading] = useState<boolean>(false);
  const [groupIdLoading, setGroupIdLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(TaskType.ONE_TIME);
  const [frequency, setFrequency] = useState(TaskFrequency.DAILY);
  const [createTaskFormData, setCreateTaskFormData] =
    useState<GetTask>(initialTaskState);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    setCreateTaskFormData({ ...createTaskFormData, type: e.target.value });
  };

  const onFrequencyChange = (e: RadioChangeEvent) => {
    setFrequency(e.target.value);
    setCreateTaskFormData({ ...createTaskFormData, frequency: e.target.value });
  };

  const fetchTasksByGroupId = async () => {
    setGroupIdLoading(true);
    try {
      const task = await getTaskByGroupId(groupId!);
      setCreateTaskFormData({
        startDate: task.startDate,
        endDate:
          task.endDate ?? dayjs(task.startDate).add(1, "day").toISOString(),
        startTime: task.startTime,
        frequency: task.frequency,
        title: task.title,
        type: task.type,
        firstDayOfTheWeek: task.firstDayOfTheWeek,
        secondDayOfTheWeek: task.secondDayOfTheWeek,
        categoryId: task.category?.id,
        status: task.status,
        points: task.points,
        endTime: task.endTime,
        dayOfTheMonth: task.dayOfTheMonth,
      });
      setValue(task.type);
      setFrequency(task.frequency);
    } catch (error) {
    } finally {
      setGroupIdLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) fetchTasksByGroupId();
    else return;
  }, [groupId]);

  console.log({ createTaskFormData });

  const handleSave = async () => {
    if (
      createTaskFormData.type === TaskType.RECURRING &&
      createTaskFormData.startDate &&
      createTaskFormData.endDate &&
      dayjs(createTaskFormData.startDate) >= dayjs(createTaskFormData.endDate)
    ) {
      message.error("Start date must be before the end date");
      return;
    }

    const payLoad = {
      ...createTaskFormData,
      startTime: createTaskFormData.startTime ?? String(dayjs()),

      firstDayOfTheWeek:
        createTaskFormData.frequency === TaskFrequency.BI_WEEKLY ||
        createTaskFormData.frequency === TaskFrequency.WEEKLY
          ? createTaskFormData.firstDayOfTheWeek
          : null,
      secondDayOfTheWeek:
        createTaskFormData.frequency === TaskFrequency.BI_WEEKLY
          ? createTaskFormData.secondDayOfTheWeek
          : null,

      endDate:
        createTaskFormData.type === TaskType.RECURRING
          ? createTaskFormData.endDate
          : null,

      dayOfTheMonth:
        createTaskFormData.frequency === TaskFrequency.MONTHLY
          ? createTaskFormData.dayOfTheMonth
          : null,
    };

    try {
      setLoading(true);
      if (groupId) {
        await updateTaskByGroupId(groupId, payLoad);
        message.success("Task Updated");
      } else {
        await createTask(payLoad);
        const tasks = await getTasks(payLoad);
        dispatch(setTasks(tasks));
        setCreateTaskFormData({
          ...initialTaskState,
          categoryId: categories.at(0)?.value,
        });
        message.success("Task Created");
      }

      router.push("/productivity/task?tab=my-task");
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
      message.error(error.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories({ type: TypeCategory.TASK });
      setCategories(
        data.map((charity) => ({
          label: charity.title,
          value: charity.id ?? "",
        }))
      );
      setCreateTaskFormData((createTaskFormData) => ({
        ...createTaskFormData,
        categoryId: data.at(0)?.id,
      }));
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const breadCrumbItems = [
    {
      title: "Back to Task",
      link: "/productivity/task",
    },
  ];

  return (
    <>
      <Row style={{ paddingTop: "15px" }}>
        <Col span={16} className="border-box">
          <BreadCrumbNav item={breadCrumbItems} />
          {/* Page Title */}
          <Row justify={"space-between"} style={{ alignItems: "center" }}>
            <Col span={24}>
              <PageTitle title={groupId ? "Edit Task" : "Create Task"} />
            </Col>
          </Row>
          <Row style={{ paddingTop: "15px" }}>
            <Col span={24}>
              <FormSelect
                label="Category"
                options={categories}
                handleChange={(value) =>
                  setCreateTaskFormData((createTaskFormData) => ({
                    ...createTaskFormData,
                    categoryId: value,
                  }))
                }
                value={createTaskFormData.categoryId}
              />
              <FormInput
                label="Title"
                placeholder="E.g. Finish gamification"
                type="text"
                value={createTaskFormData.title}
                onChange={(e) =>
                  setCreateTaskFormData({
                    ...createTaskFormData,
                    title: e.target.value,
                  })
                }
              />

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="horizontal">
                    {typeArray.map((e, i) => (
                      <Radio
                        key={i}
                        value={e}
                        style={{ textTransform: "capitalize", fontWeight: 400 }}
                      >
                        {e}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
              {/* Check One Time */}
              {createTaskFormData.type === "one-time" && (
                <div>
                  <FormInput
                    label="Date"
                    type="date"
                    value={createTaskFormData.startDate!}
                    onDateChange={(date, dateString) =>
                      setCreateTaskFormData({
                        ...createTaskFormData,
                        startDate: dateString,
                      })
                    }
                  />
                  <FormInput
                    label="Time "
                    type="time"
                    onTimeChange={(time, timeString) =>
                      setCreateTaskFormData({
                        ...createTaskFormData,
                        startTime: time,
                      })
                    }
                  />
                </div>
              )}
              {/* Recurring */}
              <div>
                {createTaskFormData.type === "recurring" && (
                  <>
                    <Row gutter={24}>
                      <Col span={12}>
                        <FormInput
                          label="Start Date"
                          value={createTaskFormData.startDate ?? ""}
                          type="date"
                          onDateChange={(date, dateString) =>
                            setCreateTaskFormData({
                              ...createTaskFormData,
                              startDate: dateString,
                            })
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          label="End Date"
                          type="date"
                          value={createTaskFormData.endDate ?? ""}
                          onDateChange={(date, dateString) =>
                            setCreateTaskFormData({
                              ...createTaskFormData,
                              endDate: dateString,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <FormInput
                      label="Time"
                      type="time"
                      value={createTaskFormData.startTime!}
                      onTimeChange={(time, timeString) =>
                        setCreateTaskFormData((createTaskFormData) => ({
                          ...createTaskFormData,
                          startTime: time,
                        }))
                      }
                    />

                    <div className="form-group">
                      <label htmlFor="type" style={{ marginRight: "30px" }}>
                        Frequency
                      </label>
                      <Radio.Group
                        onChange={onFrequencyChange}
                        value={frequency}
                      >
                        <Space direction="horizontal">
                          {frequencyArray.map((e, i) => (
                            <Radio
                              key={i}
                              value={e}
                              style={{
                                textTransform: "capitalize",
                                fontWeight: 400,
                              }}
                            >
                              {e}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </div>
                    {createTaskFormData.frequency === "bi-weekly" && (
                      <Row gutter={24}>
                        <Col span={12}>
                          <FormSelect
                            label="First Day of the Week"
                            options={daysArray}
                            value={createTaskFormData.firstDayOfTheWeek ?? ""}
                            handleChange={(value) =>
                              setCreateTaskFormData((createTaskFormData) => ({
                                ...createTaskFormData,
                                firstDayOfTheWeek: value,
                              }))
                            }
                          />
                        </Col>
                        <Col span={12}>
                          <FormSelect
                            label="Second Day of the Week"
                            options={daysArray}
                            value={createTaskFormData.secondDayOfTheWeek ?? ""}
                            handleChange={(value) =>
                              setCreateTaskFormData((createTaskFormData) => ({
                                ...createTaskFormData,
                                secondDayOfTheWeek: value,
                              }))
                            }
                          />
                        </Col>
                      </Row>
                    )}
                    {createTaskFormData.frequency === TaskFrequency.MONTHLY && (
                      <Row gutter={24}>
                        <Col span={12}>
                          <FormSelect
                            label="Days of the Month"
                            options={daysOfMonthDropdown}
                            value={createTaskFormData.dayOfTheMonth ?? ""}
                            handleChange={(value) =>
                              setCreateTaskFormData((createTaskFormData) => ({
                                ...createTaskFormData,
                                dayOfTheMonth: value,
                              }))
                            }
                          />
                        </Col>
                      </Row>
                    )}
                    {createTaskFormData.frequency === TaskFrequency.WEEKLY && (
                      <Row gutter={24}>
                        <Col span={12}>
                          <FormSelect
                            label="Day of the Week"
                            options={daysArray}
                            value={createTaskFormData.firstDayOfTheWeek ?? ""}
                            handleChange={(value) =>
                              setCreateTaskFormData((createTaskFormData) => ({
                                ...createTaskFormData,
                                firstDayOfTheWeek: value,
                              }))
                            }
                          />
                        </Col>
                      </Row>
                    )}
                  </>
                )}
              </div>

              <Flex gap={"middle"} justify="end">
                <PrimaryButton
                  text="Cancel"
                  variant="secondary"
                  onClick={() => router.back()}
                />
                <PrimaryButton
                  loading={loading}
                  disabled={
                    !createTaskFormData.title ||
                    !createTaskFormData.startDate ||
                    !createTaskFormData.startTime
                  }
                  onClick={() => handleSave()}
                  text="Save"
                  variant="primary"
                />
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
