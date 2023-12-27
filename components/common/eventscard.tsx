import { Card } from "antd";
import { MdAvTimer, MdDateRange, MdInsertLink } from "react-icons/md";
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
              <div className="date-time-info">
                <div>
                  <MdDateRange size={13} />

                  <span>07 Dec 2023</span>
                </div>
                <div>
                  <MdAvTimer size={13} />

                  <span>2:00PM</span>
                </div>
              </div>
              <Title level={3}>
                Lorem Ipsum is simply dummy text of the printing.
              </Title>
              <Title level={3}>{event.title}</Title>
            </div>
          }
          description={
            <div className="events-card-description">
              <a
                href="#"
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                {" "}
                <MdInsertLink size={16} /> meet.google.com/tesrtin-test
              </a>
              <PrimaryButton text="Join Event" variant="primary" />
            </div>
          }
        />
      </Card>
    </>
  );
};
