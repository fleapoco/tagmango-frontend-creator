"use client";

import { Col, Flex, Row } from "antd";
import { BreadCrumbNav } from "../../../../../components/common/breadcrumb";
import { PrimaryButton } from "../../../../../components/common/button";
import { SwitchToggle } from "../../../../../components/common/switch";

import useAPI from "@/hooks/useApi";
import { APIError, EventData } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ImageUpload from "../../../../../components/form/imgupload";
import { FormInput } from "../../../../../components/form/input";
import { FormTextArea } from "../../../../../components/form/textarea";
import PageTitle from "../../../../../components/pagetitle";
import style from "../../../../../style/creator.module.scss";

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
      <div className={`${style["creator-task-form"]}`}>
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
                      <FormInput
                        placeholder="Start Time"
                        label=""
                        type="time"
                        onTimeChange={(time: Date) => {
                          setEventDataType((prev) => {
                            return { ...prev, startTime: time.toISOString() };
                          });
                        }}
                        name="startTime"
                        dateTimeValue={eventDataType.startTime}
                      />
                      <span style={{ marginBottom: "12px" }}>to</span>
                      <FormInput
                        placeholder="End Time"
                        label=""
                        type="time"
                        onTimeChange={(time: Date) => {
                          setEventDataType((prev) => {
                            return { ...prev, endTime: time.toISOString() };
                          });
                        }}
                        name="endTime"
                        dateTimeValue={eventDataType.endTime}
                      />
                    </Flex>
                  </Col>
                </Row>
              </div>
              <div className="form-group">
                <Flex
                  gap={2}
                  align="center"
                  justify="space-between"
                  className="input-box "
                >
                  <label htmlFor="">Recurring</label>
                  <SwitchToggle
                    onChange={handleRecurringChange}
                    value={eventDataType.recurringStatus}
                  />
                </Flex>
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
