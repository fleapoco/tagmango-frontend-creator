"use client";

import { Col, DatePicker, Flex, Row, Select, TimePicker } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { BreadCrumbNav } from "../../../../../components/common/breadcrumb";
import { PrimaryButton } from "../../../../../components/common/button";
import { SwitchToggle } from "../../../../../components/common/switch";

import useAPI from "@/hooks/useApi";
import { APIError, EventData } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ImageUpload from "../../../../../components/form/imgupload";
import { FormInput } from "../../../../../components/form/input";
import { FormTextArea } from "../../../../../components/form/textarea";
import PageTitle from "../../../../../components/pagetitle";
import style from "../../../../../style/creator.module.scss";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";

type EventDataType = {
  title: string;
  description: string;
  eventLink: string;
  startDate: string | Date | number | null;
  endDate: string | Date | number | null;
  startTime: string | Date | number | null;
  endTime: string | Date | number | null;
  recurringStatus?: boolean;
  backgroundImageUrl: string;
  badgeIds?: string[];
};

const CreateEvent = () => {
  const breadCrumbItems = [
    {
      title: "Back to Event",
      link: "/creator/events",
    },
  ];

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const router = useRouter();
  const { createSingleEvent, getCreatorEventById, updateEvent } = useAPI();
  const params = useSearchParams();
  const eventId = params.get("id");

  const [eventDataType, setEventDataType] = useState<EventDataType>({
    title: "",
    description: "",
    eventLink: "",
    startDate: new Date().toISOString(),
    endDate: "",
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    recurringStatus: false,
    backgroundImageUrl: "",
    badgeIds: [
      "122e35d9-d9c7-4909-a1aa-6d302538b585",
      "8428987e-e34f-46d7-8886-2cb4f852a103",
      "334382d6-e099-4c43-b559-f09310934d84",
    ],
  });

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId);
    }
  }, [eventId]);

  const isValidFormData = (eventData: EventDataType) => {
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.eventLink ||
      !eventData.startDate ||
      !eventData.endDate ||
      !eventData.startTime ||
      !eventData.endTime ||
      !eventData.backgroundImageUrl
    )
      return false;
    return true;
  };

  const fetchEventById = async (id: string) => {
    if (!id) return;
    try {
      let data: APIError | EventData = await getCreatorEventById(id);

      if ("title" in data) {
        setEventDataType({
          title: data.title,
          description: data.description,
          eventLink: data.eventLink,
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime,
          recurringStatus: data.recurringStatus,
          backgroundImageUrl: data.backgroundImageUrl,
        });
      }
    } catch (error) {}
  };

  const handleRecurringChange = (checked: boolean) => {
    setEventDataType((prev) => {
      return { ...prev, recurringStatus: checked };
    });
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "title")
      setEventDataType((prev) => {
        return { ...prev, title: e.target.value };
      });
    else if (e.target.name === "description")
      setEventDataType((prev) => {
        return { ...prev, description: e.target.value };
      });
    else if (e.target.name === "eventLink")
      setEventDataType((prev) => {
        return { ...prev, eventLink: e.target.value };
      });
  };

  const handleUpload = (fileUrl: string) => {
    setEventDataType((prev) => {
      return { ...prev, backgroundImageUrl: fileUrl };
    });
  };

  const updateEventAction = async () => {
    try {
      let data: APIError | EventData = await updateEvent(
        eventDataType,
        eventId
      );

      if ("statusCode" in data) {
        alert(data?.message);
        return;
      }

      router.push("/creator/events");
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!isValidFormData(eventDataType)) alert("Invalid/Missing Input Data");

    try {
      if (eventId) {
        await updateEventAction();
        return;
      }

      let data: APIError | EventData = await createSingleEvent(eventDataType);

      if ("statusCode" in data) {
        alert(data?.message);
        return;
      }

      router.push("/creator/events");
    } catch (error) {}
  };

  return (
    <>
      <div className={`${style["creator-event-form"]}`}>
        <Row style={{ paddingTop: "16px" }}>
          <Col span={16} className="border-box">
            <BreadCrumbNav item={breadCrumbItems} />
            {/* Page Title */}
            <Row justify={"space-between"} style={{ alignItems: "center" }}>
              <Col span={24}>
                <PageTitle title={eventId ? "Edit Event" : "Create Event"} />
              </Col>
            </Row>
            <div style={{ paddingTop: "15px" }}>
              <FormInput
                placeholder="Add a Title"
                label="Title"
                type="text"
                onChange={handleOnChange}
                name="title"
                value={eventDataType.title}
              />
              {/* <FormSelect
                label='Who can join this Event?'
                handleChange={function (value: string): void {
                  throw new Error('Function not implemented.');
                }}
              /> */}
              <FormInput
                placeholder="Add a Event Link"
                label="Event Link"
                type="text"
                onChange={handleOnChange}
                name="eventLink"
                value={eventDataType.eventLink}
              />

              <div className="form-group schedule-wrapper">
                <label htmlFor="schedule">Schedule Event</label>
                <Row gutter={16}>
                  <Col span={10}>
                    <FormInput
                      placeholder="Date"
                      label=""
                      type="date"
                      onDateChange={(date: Date) => {
                        setEventDataType((prev) => {
                          return { ...prev, startDate: date.toISOString() };
                        });
                        setEventDataType((prev) => {
                          return { ...prev, endDate: date.toISOString() };
                        });
                      }}
                      name="startDate"
                      dateTimeValue={eventDataType.startDate}
                    />
                  </Col>
                  <Col span={14}>
                    <Flex
                      align="center"
                      justify="space-between"
                      gap={16}
                      style={{ width: "100%" }}
                    >
                      {/* <FormInput
                        placeholder='Start Time'
                        label=''
                        type='time'
                        onTimeChange={(time: Date) => {
                          setEventDataType((prev) => {
                            return { ...prev, startTime: time.toISOString() };
                          });
                        }}
                        name='startTime'
                        dateTimeValue={eventDataType.startTime}
                      /> */}
                      <TimePicker
                        value={dayjs(eventDataType.startTime)}
                        placeholder="Start Time"
                        onChange={(time) => {
                          if (time) {
                            setEventDataType((prev) => {
                              return { ...prev, startTime: time.toISOString() };
                            });
                          }
                        }}
                      />
                      <span>to</span>
                      {/* <FormInput
                        placeholder='End Time'
                        label=''
                        type='time'
                        onTimeChange={(time: Date) => {
                          setEventDataType((prev) => {
                            return { ...prev, endTime: time.toISOString() };
                          });
                        }}
                        name='endTime'
                        dateTimeValue={eventDataType.endTime}
                      /> */}

                      <TimePicker
                        value={dayjs(eventDataType.endTime)}
                        placeholder="End Time"
                        onChange={(time) => {
                          if (time) {
                            setEventDataType((prev) => {
                              return { ...prev, endTime: time.toISOString() };
                            });
                          }
                        }}
                      />
                    </Flex>
                  </Col>
                </Row>
              </div>

              {/* Recurring Box */}
              <div className="recurring-box">
                <div className="recurring-header form-group">
                  <Flex gap={2} align="center" justify="space-between">
                    <div>
                      <label htmlFor="">Recurring</label>

                      {eventDataType.recurringStatus && (
                        <Link href={"#"}>
                          Weekly on Friday until Feb 05, 2024
                        </Link>
                      )}
                    </div>
                    <SwitchToggle
                      onChange={handleRecurringChange}
                      value={eventDataType.recurringStatus}
                    />
                  </Flex>
                </div>
                {eventDataType.recurringStatus && (
                  <div className="recurring-content">
                    <Row
                      gutter={15}
                      style={{ alignItems: "center", rowGap: 30 }}
                    >
                      <Col span={8}>
                        <span>Repeat every</span>
                      </Col>
                      <Col span={16}>
                        <Select
                          defaultValue="week"
                          style={{ width: "auto" }}
                          bordered={false}
                          options={[
                            { value: "week", label: "week" },
                            { value: "monday", label: "monday" },
                            { value: "sunday", label: "sunday" },
                          ]}
                        />
                      </Col>
                      <Col span={8}>
                        <span>Repeat on</span>
                      </Col>
                      <Col span={16}>
                        <div className="radio-group">
                          <label htmlFor="Monday">
                            <input
                              type="checkbox"
                              name="Monday"
                              value="Monday"
                              id="Monday"
                            />
                            <div>M</div>
                          </label>
                          <label htmlFor="Tuesday">
                            <input
                              type="checkbox"
                              name="Tuesday"
                              value="Tuesday"
                              id="Tuesday"
                            />
                            <div>T</div>
                          </label>
                          <label htmlFor="Wednesday">
                            <input
                              type="checkbox"
                              name="Wednesday"
                              value="Wednesday"
                              id="Wednesday"
                            />
                            <div>W</div>
                          </label>
                          <label htmlFor="Thursday">
                            <input
                              type="checkbox"
                              name="Thursday"
                              value="Thursday"
                              id="Thursday"
                            />
                            <div>T</div>
                          </label>
                          <label htmlFor="Friday">
                            <input
                              type="checkbox"
                              name="Friday"
                              value="Friday"
                              id="Friday"
                            />
                            <div>F</div>
                          </label>
                          <label htmlFor="Saturday">
                            <input
                              type="checkbox"
                              name="Saturday"
                              value="Saturday"
                              id="Saturday"
                            />
                            <div>S</div>
                          </label>
                          <label htmlFor="Sunday">
                            <input
                              type="checkbox"
                              name="Sunday"
                              value="Sunday"
                              id="Sunday"
                            />
                            <div>S</div>
                          </label>
                          {/* <label htmlFor=''>
                          <input type='radio' name='weekday' value='W' />
                        </label>
                        <label htmlFor=''>
                          <input type='radio' name='weekday' value='T' />
                        </label>
                        <label htmlFor=''>
                          <input type='radio' name='weekday' value='F' />
                        </label>
                        <label htmlFor=''>
                          <input type='radio' name='weekday' value='S' />
                        </label>
                        <label htmlFor=''>
                          <input type='radio' name='weekday' value='S' />
                        </label> */}
                        </div>
                      </Col>
                      <Col span={8}>
                        <span>Ends on</span>
                      </Col>
                      <Col span={16}>
                        <DatePicker
                          defaultValue={dayjs("2015/01/01", dateFormat)}
                          format={dateFormat}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>

              {/* About Event Start */}
              <div className="about-event">
                <h4>About Event</h4>
                <div className="form-group">
                  <label htmlFor="header-img">Header Image</label>
                  <ImageUpload
                    handleUpload={handleUpload}
                    existImageUrl={
                      eventId ? eventDataType.backgroundImageUrl : ""
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <FormTextArea
                    placeholder="Event Description"
                    onChange={handleOnChange}
                    name="description"
                    value={eventDataType.description}
                  />
                </div>
              </div>

              <Flex gap="middle" justify="end">
                <PrimaryButton
                  variant="secondary"
                  text="Cancel"
                  onClick={() => router.back()}
                />
                <PrimaryButton
                  variant="primary"
                  text="Save"
                  disabled={!isValidFormData(eventDataType)}
                  onClick={handleSubmit}
                />
              </Flex>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreateEvent;
