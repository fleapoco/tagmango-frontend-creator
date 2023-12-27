import { Calendar, CalendarProps, Col, Row, Typography } from 'antd';
import type { Dayjs } from 'dayjs';

import MarkAsCompleteCard from '../../components/markascompletecard';
import PageTitle from '../../components/pagetitle';
import style from '../../style/task.module.scss';

const { Title } = Typography;

export const Habit = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <>
      <div className={`${style['habit-page']}`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center', padding: '15px 0' }}
        >
          <Col span={24}>
            <PageTitle title='Habits' />
          </Col>
        </Row>
        {/* Calendar And Complete habits Cards */}
        <Row gutter={[16, 0]}>
          {/* Calendar Start */}
          <Col span={16}>
            <div className='border-box'>
              <Calendar onPanelChange={onPanelChange} />
            </div>
          </Col>
          {/* Habits Cards Wrapper Start */}
          <Col span={8}>
            <div className='border-box'>
              <Title
                level={5}
                className='sub-title'
                style={{ margin: '0 0 18px 0' }}
              >
                Complete today's Habits
              </Title>
              <Row gutter={[0, 12]}>
                {[1, 2, 3, 4].map((i) => (
                  <Col span={24} key={i}>
                    <MarkAsCompleteCard />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
