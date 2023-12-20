import { useEffect, useState } from "react";

import type { RadioChangeEvent } from "antd";
import { Col, Flex, Radio, Row, Space } from "antd";
import PageTitle from "../../components/pagetitle";

import { initialTaskState } from "@/empty-state-objects/empty";
import useAPI from "@/hooks/useApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTasks } from "@/redux/reducers/task.reducer";
import { GetTask, TaskFrequency, TaskType, TypeCategory } from "@/types";
import { PrimaryButton } from "../../components/common/button";
import { FormInput } from "../../components/form/input";
import { FormSelect } from "../../components/form/select";
const frequencyArray = ["daily", "bi-weekly", "weekly", "monthly"];
const typeArray = ["one-time", "recurring"];

export const CreateTask = () => {
  const { createTask, getTasks, getCategories } = useAPI();
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

  const handleSave = async () => {
    try {
      await createTask(createTaskFormData);
      const tasks = await getTasks({});
      dispatch(setTasks(tasks));
      setCreateTaskFormData(initialTaskState);
    } catch (error) {}
  };

  const fetchCharities = async () => {
    try {
      const data = await getCategories({ type: TypeCategory.TASK });
      setCategories(
        data.map((charity) => ({
          label: charity.title,
          value: charity.id ?? "",
        }))
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  return (
    <>
      <div className={`common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center" }}
          className="p-15"
        >
          <Col span={24}>
            <PageTitle title="Create Task" />
          </Col>
        </Row>
        <div className="gray-box p-15">
          <Row>
            <Col span={24}>
              <FormSelect
                label="Category"
                options={categories}
                handleChange={(value) =>
                  setCreateTaskFormData({
                    ...createTaskFormData,
                    categoryId: value,
                  })
                }
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
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="type" style={{ marginRight: "30px" }}>
                    Type
                  </label>
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="horizontal">
                      {typeArray.map((e) => (
                        <Radio value={e}>{e}</Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Row>
              </div>
              {/* Check One Time */}
              {createTaskFormData.type === "one-time" && (
                <div>
                  <FormInput
                    label="Date"
                    type="date"
                    onDateChange={(date, dateString) =>
                      setCreateTaskFormData({
                        ...createTaskFormData,
                        startDate: dateString,
                      })
                    }
                  />
                  <FormInput
                    label="Time"
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
                          type="date"
                          onDateChange={(date, dateString) =>
                            setCreateTaskFormData({
                              ...createTaskFormData,
                              startDate: date,
                            })
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          label="End Date"
                          type="date"
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
                      onTimeChange={(time, timeString) =>
                        setCreateTaskFormData({
                          ...createTaskFormData,
                          startTime: time,
                        })
                      }
                    />
                  </>
                )}

                <div className="form-group">
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="type" style={{ marginRight: "30px" }}>
                      Frequency
                    </label>
                    <Radio.Group onChange={onFrequencyChange} value={frequency}>
                      <Space direction="horizontal">
                        {frequencyArray.map((e) => (
                          <Radio value={e}>{e}</Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Row>
                </div>
                {createTaskFormData.frequency === "bi-weekly" && (
                  <Row gutter={24}>
                    <Col span={12}>
                      <FormInput
                        label="First day of the Week"
                        type="text"
                        value={createTaskFormData.firstDayOfTheWeek}
                        onChange={(e) =>
                          setCreateTaskFormData({
                            ...createTaskFormData,
                            firstDayOfTheWeek: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <FormInput
                        label="Second day of the Week"
                        type="text"
                        value={createTaskFormData.secondDayOfTheWeek}
                        onChange={(e) =>
                          setCreateTaskFormData({
                            ...createTaskFormData,
                            secondDayOfTheWeek: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                )}
              </div>
              <Flex gap={"middle"} justify="end">
                <PrimaryButton text="Cancel" variant="secondary" />
                <PrimaryButton
                  onClick={() => handleSave()}
                  text="Save"
                  variant="dark"
                />
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
