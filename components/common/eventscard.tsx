import { Card } from 'antd';
import { PrimaryButton } from './button';
const { Meta } = Card;

import { Typography } from 'antd';

const { Title } = Typography;

export const EventsCard = () => {
  return (
    <>
      <Card
        className='events-card'
        style={{ width: '100%' }}
        cover={
          <img
            alt='example'
            src='https://images.unsplash.com/photo-1610878180933-123728745d22?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
        }
      >
        <Meta
          title={
            <div className='event-card-heading'>
              <Title level={5}>07 Dec 2023, 06:00 PM - 07:00PM</Title>
              <Title level={3}>
                Lorem Ipsum is simply dummy text of the printing.
              </Title>
            </div>
          }
          description={
            <div className='events-card-description'>
              <a href='#'>meet.google.com/tesrtin-test</a>
              <PrimaryButton text='Join Event' variant='primary' />
            </div>
          }
        />
      </Card>
    </>
  );
};
