"use client";
import { useRouter } from "next/navigation";
import PageTitle from "../../../../components/pagetitle";
import style from "../../../../style/creator.module.scss";

import useAPI from "@/hooks/useApi";
import { EventData } from "@/types";
import { Col, DatePicker, Row, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { PreviousEvents } from "./previous";
import { UpcomingEvents } from "./upcoming";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const { Title } = Typography;

const CreatorEvent = () => {
  const router = useRouter();
  const { getCreatorEvents } = useAPI();
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [upcoming, setUpcoming] = useState<EventData[]>([]);
  const [previous, setPrevious] = useState<EventData[]>([]);
  const [groupedUpcoming, setGroupedUpcoming] = useState({
    Today: [],
    Tomorrow: [],
  });

  useEffect(() => {
    fetchEventData();
  }, []);

  // Filter events into upcoming and previous based on the start time
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date();

    const upcomingEvents = eventsData.filter((event: EventData) => {
      if (event.startDate && event.startTime) {
        const eventStartDate = new Date(event.startDate)
          .toISOString()
          .split("T")[0];
        const eventStartTime = new Date(event.startTime);

        return (
          eventStartDate > currentDate ||
          (eventStartDate === currentDate &&
            eventStartTime.getTime() > currentTime.getTime())
        );
      }
    });

    const previousEvents = eventsData.filter((event: EventData) => {
      if (event.startDate && event.startTime) {
        const eventStartDate = new Date(event.startDate)
          .toISOString()
          .split("T")[0];
        const eventStartTime = new Date(event.startTime);

        return (
          eventStartDate < currentDate ||
          (eventStartDate === currentDate &&
            eventStartTime.getTime() <= currentTime.getTime())
        );
      }
    });

    setUpcoming(upcomingEvents);
    setPrevious(previousEvents);
  }, [eventsData]);

  // Group upcoming array based on start date
  useEffect(() => {
    const grouped = upcoming.reduce(
      (result: any, event: EventData) => {
        if (event.startDate) {
          const eventStartDate = new Date(event.startDate);
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);

          if (eventStartDate.toDateString() === today.toDateString()) {
            result.Today.push(event);
          } else if (
            eventStartDate.toDateString() === tomorrow.toDateString()
          ) {
            result.Tomorrow.push(event);
          } else {
            const key = eventStartDate.toLocaleDateString();
            if (!result[key]) {
              result[key] = [];
            }
            result[key].push(event);
          }

          return result;
        }
      },
      {
        Today: [],
        Tomorrow: [],
      }
    );

    setGroupedUpcoming(grouped);
  }, [upcoming]);

  const fetchEventData = async () => {
    try {
      let data = await getCreatorEvents();
      if (data && Array.isArray(data)) {
        setEventsData(data);
      }
    } catch (error) {}
  };

  const HangleButttonClick = () => {
    router.push("/creator/events/createevent");
  };

  return (
    <>
      <div className={`${style["creator-event"]} common-panel-wrapper`}>
        {/* Page Title */}
        <Row className="p-15">
          <Col span={24}>
            <PageTitle title="Events" />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Upcoming" key="1">
                {/* Upcoming Events */}
                <div className="p-15">
                  <UpcomingEvents data={groupedUpcoming} />
                </div>
              </TabPane>
              <TabPane tab="Previous" key="2">
                <div className="previous-wrapper">
                  <PreviousEvents data={previous} />
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreatorEvent;
