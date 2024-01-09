import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import FullCalendar from '@fullcalendar/react';
import { Progress } from 'antd';
import React from 'react';

const customEvents = [
  {
    title: 'Custom Event 1',
    start: '2024-01-15',
    end: '2024-01-15',
    progress: <Progress percent={50} />,
  },
  {
    title: 'Custom Event 1',
    start: '2024-01-15',
    end: '2024-01-15',
    progress: <Progress percent={50} />,
  },
];

const renderEventContent = (eventInfo: any) => {
  return (
    <div className='on-calendar-content'>
      <h6>{eventInfo.event.title}</h6>
      <div>{eventInfo.event.extendedProps.progress}</div>
    </div>
  );
};

export default class FullCalendarData extends React.Component {
  render() {
    return (
      <div className='full-calendar'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={false}
          eventColor='var(--primary-color)'
          events={customEvents}
          eventContent={renderEventContent}
        />
      </div>
    );
  }
}
