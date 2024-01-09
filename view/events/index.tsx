import Loading from '@/app/loading';
import useApi from '@/hooks/useApi';
import { GetEventType } from '@/types';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { EventsCard } from '../../components/common/eventscard';
import PageTitle from '../../components/pagetitle';

export const Events = () => {
  const { getUserEvents } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<GetEventType[]>([]);

  const fetUserEvents = async () => {
    setIsLoading(true);
    try {
      const events = await getUserEvents();
      setEvents(events);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetUserEvents();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading pageloader={true} loading={isLoading} />
      ) : (
        <>
          {/* Page Title */}
          <Row style={{ padding: '15px 0' }}>
            <Col span={24}>
              <PageTitle title='Events' />
            </Col>
          </Row>
          {/* Events Cards */}
          <Row
            gutter={[16, 16]}
            style={{ flexWrap: 'wrap', alignItems: 'stretch' }}
          >
            {events.map((event) => (
              <Col md={12} lg={8} xl={6} key={event.id}>
                <EventsCard event={event} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
