import { Card } from "antd";
import { PrimaryButton } from "./button";
const { Meta } = Card;

import { GetEventType } from "@/types";
import { Typography } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

interface EvenProps {
  event: GetEventType;
}

export const EventsCard = ({ event }: EvenProps) => {
  return (
    <>
      <Card
        className="events-card"
        style={{ width: "100%" }}
        cover={
          <img
            alt="example"
            src={
              event.backgroundImageUrl ??
              "https://images.unsplash.com/photo-1610878180933-123728745d22?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        }
      >
        <Meta
          title={
            <div className="event-card-heading">
              <Title level={5}>
                {dayjs(event.startDate).format("DD MMM YYYY")},
                {dayjs(event.startTime).format("hh:mm A")} -
                {dayjs(event.endTime).format("hh:mm A")}
              </Title>
              <Title level={3}>{event.title}</Title>
            </div>
          }
          description={
            <div className="events-card-description">
              <a href="#">{event.eventLink}</a>
              <PrimaryButton text="Join Event" variant="primary" />
            </div>
          }
        />
      </Card>
    </>
  );
};
