import { Col, Row } from 'antd';
import { EventsCard } from '../../components/common/eventscard';
import PageTitle from '../../components/pagetitle';

export const Events = () => {
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
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Col span={8} key={i}>
            <EventsCard />
          </Col>
        ))}
      </Row>
    </>
  );
};
