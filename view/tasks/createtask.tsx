import { useState } from "react";

import type { RadioChangeEvent } from "antd";
import { Col, Flex, Radio, Row, Space } from "antd";
import PageTitle from "../../components/pagetitle";

import { emptyTask } from "@/empty-state-objects/empty";
import useAPI from "@/hooks/useApi";
import { GetTask } from "@/types/fetchCall";
import { PrimaryButton } from "../../components/common/button";
import { FormInput } from "../../components/form/input";
import { FormSelect } from "../../components/form/select";
const frequencyArray = ["daily", "bi-weekly", "weekly", "monthly"];
const typeArray = ["one-time", "recurring"];

export const CreateTask = () => {
  const { createTask } = useAPI();
  const [value, setValue] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [createTaskFormData, setCreateTaskFormData] =
    useState<GetTask>(emptyTask);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setCreateTaskFormData({ ...createTaskFormData, type: e.target.value });
  };
  const onFrequencyChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setFrequency(e.target.value);
    setCreateTaskFormData({ ...createTaskFormData, frequency: e.target.value });
  };

  console.log(createTaskFormData);

  const handleSave = async () => {
    await createTask(createTaskFormData);
  };
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
              <FormSelect label="Category" />
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
                          label="Date"
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
                          label="Date"
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
                        value={createTaskFormData.lastDayOfTheWeek}
                        onChange={(e) =>
                          setCreateTaskFormData({
                            ...createTaskFormData,
                            lastDayOfTheWeek: e.target.value,
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
