import { Calendar, CalendarProps, Col, Row, Typography } from 'antd';
import type { Dayjs } from 'dayjs';

import useAPI from '@/hooks/useApi';
import { HabitType } from '@/types';
import { useEffect, useState } from 'react';
import MarkAsCompleteCard from '../../components/markascompletecard';
import PageTitle from '../../components/pagetitle';
import style from '../../style/task.module.scss';

const { Title } = Typography;

export const Habit = () => {
  const { getUserHabits } = useAPI();
  const [habitData, setHabitData] = useState<HabitType[]>();

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const fetchUserHabits = async () => {
    try {
      const data = await getUserHabits();
      setHabitData(data ?? []);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchUserHabits();
  }, []);

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
            <div
              className='border-box'
              style={{ width: '100%', height: '100%' }}
            >
              <Title
                level={5}
                className='sub-title'
                style={{ margin: '0 0 18px 0' }}
              >
                Complete today's Habits
              </Title>
              {habitData && (
                <Row gutter={[0, 12]}>
                  {habitData.map((e, i) => (
                    <Col span={24} key={i}>
                      <MarkAsCompleteCard
                        habitData={e}
                        onMarkComplete={() => fetchUserHabits()}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
