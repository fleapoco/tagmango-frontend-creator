import useApi from '@/hooks/useApi';
import { GetEventType } from '@/types';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { EventsCard } from '../../components/common/eventscard';
import PageTitle from '../../components/pagetitle';

export const Events = () => {
  const { getUserEvents } = useApi();
  const [events, setEvents] = useState<GetEventType[]>([]);

  const fetUserEvents = async () => {
    try {
      const events = await getUserEvents();
      setEvents(events);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetUserEvents();
  }, []);

  return (
    <>
      {/* Page Title */}
      <Row style={{ padding: '15px 0' }}>
        <Col span={24}>
          <PageTitle title='Events' />
        </Col>
      </Row>
      {/* Events Cards */}
      <Row gutter={[16, 16]}>
        {events.map((event) => (
          <Col span={6} key={event.id}>
            <EventsCard event={event} />
          </Col>
        ))}
      </Row>
    </>
  );
};
