import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // import the interaction plugin
import FullCalendar from '@fullcalendar/react';
import { Progress } from 'antd';
import React from 'react';

const customEvents = [
  {
    title: 'Tagmango Event',
    start: '2024-01-15',
    end: '2024-01-15',
    progress: <Progress percent={50} />,
    backgroundColor: '#fa6800',
    borderColor: '#fa6800',
  },
  {
    title: 'Fleapo Event 1',
    start: '2024-01-15',
    end: '2024-01-15',
    progress: <Progress percent={20} />,
    backgroundColor: '#d80473',
    borderColor: '#d80473',
  },
  {
    title: 'Fleapo Event 3',
    start: '2024-01-03',
    end: '2024-01-03',
    progress: <Progress percent={20} />,
    backgroundColor: '#d80473',
    borderColor: '#d80473',
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
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          editable={true}
          droppable={true}
          weekends={false}
          height='auto'
          events={customEvents}
          eventTextColor='#fff'
          eventContent={renderEventContent}
        />
      </div>
    );
  }
}
