"use client";
import { EventData } from "@/types";
import { Col, DatePicker, Flex, List, Row, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;
const { Title } = Typography;

type PreviousEventsType = {
  data?: EventData[] | [] | null;
  isLoading: boolean;
};

export const PreviousEvents = ({ data, isLoading }: PreviousEventsType) => {
  const router = useRouter();
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const HangleButttonClick = () => {
    router.push("/creator/events/createevent");
  };
  return (
    <>
      <Spin size="large" spinning={isLoading}>
        <div className="upcoming-events-list" style={{ paddingTop: "3px" }}>
          <List itemLayout="horizontal">
            {data &&
              data.map((event: EventData) => (
                <List.Item className="list-item" key={event?.id}>
                  <div style={{ width: "100%" }}>
                    <div className="event-details-wrapper">
                      <Row
                        gutter={[15, 0]}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Col span={6}>
                          <div className="date-time-count">
                            {event?.startTime && event?.endTime && (
                              <Title level={4}>
                                {new Date(event?.startTime).toLocaleTimeString(
                                  "en-US",
                                  options
                                )}{" "}
                                -{" "}
                                {new Date(event?.endTime).toLocaleTimeString(
                                  "en-US",
                                  options
                                )}
                              </Title>
                            )}
                            {event.recurringStatus && (
                              <Title level={5}>Occurrence 1 of 1</Title>
                            )}
                          </div>
                        </Col>
                        <Col span={18}>
                          <Flex
                            className="event-details"
                            gap={16}
                            align="center"
                          >
                            <div className="img-box">
                              <img
                                src={event?.backgroundImageUrl}
                                style={{ objectFit: "fill" }}
                                alt={event?.title}
                              />
                            </div>
                            <div className="content-wrap">
                              <Title level={5}>{event?.description}</Title>
                            </div>
                          </Flex>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </List.Item>
              ))}
          </List>
        </div>
      </Spin>
    </>
  );
};
