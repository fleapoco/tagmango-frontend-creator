import { Card } from 'antd';
import { MdAvTimer, MdCalendarMonth, MdDateRange } from 'react-icons/md';
import { PrimaryButton } from './button';

import { GetEventType } from '@/types';
import { Typography } from 'antd';
import { useRouter } from 'next/navigation';

const { Meta } = Card;

const { Title } = Typography;

interface EvenProps {
  event: GetEventType;
}

export const EventsCard = ({ event }: EvenProps) => {
  const router = useRouter();
  return (
    <>
      <Card
        className='events-card'
        style={{ width: '100%' }}
        cover={
          <>
            {event.backgroundImageUrl ? (
              <img alt='example' src={event.backgroundImageUrl} />
            ) : (
              <div className='calendar-icon-box'>
                <MdCalendarMonth size={32} />
              </div>
            )}
          </>
        }
      >
        <Meta
          title={
            <div className='event-card-heading'>
              <div className='date-time-info'>
                <div>
                  <MdDateRange size={13} />
                  <span>07 Dec 2023</span>
                </div>
                <div>
                  <MdAvTimer size={13} />
                  <span>2:00PM</span>
                </div>
              </div>
              <Title level={3}>{event.title}</Title>
            </div>
          }
          description={
            <div className='events-card-description'>
              <a
                href={event.eventLink}
                target='_blank'
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <PrimaryButton text='Join Event' variant='primary' />
              </a>
            </div>
          }
        />
      </Card>
    </>
  );
};
