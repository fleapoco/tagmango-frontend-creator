import { Calendar, CalendarProps, Col, Row, Space, Typography } from 'antd';
import type { Dayjs } from 'dayjs';

import useAPI from '@/hooks/useApi';
import { HabitType } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CustomTag } from '../../components/common/tag';
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
      const habitData = await getUserHabits();
      setHabitData(habitData ?? []);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchUserHabits();
  }, []);

  const monthCellRender = (value: Dayjs) => {
    const formattedMonth = value.format('YYYY-MM');
    const habitInMonth = habitData?.filter((t) =>
      dayjs(t.habitSubmit?.createdAt).isSame(formattedMonth, 'month')
    );

    return (
      <div>
        {habitInMonth?.map((habit) => (
          <div key={habit.id} style={{ marginBottom: 8 }}>
            {/* Check if the habit's startDate matches the current cell's date */}
            {dayjs(habit.habitSubmit?.createdAt).isSame(value, 'day') && (
              <Space>
                <CustomTag
                  color={habit.habitSubmit !== null ? '#87d068' : 'warning'}
                  title={` ${habit.title} `}
                />
              </Space>
            )}
          </div>
        ))}
      </div>
    );
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
        <div className='list-calendar-wrapper'>
          <Row gutter={[16, 0]} style={{ height: '100%' }}>
            {/* Calendar Start */}
            <Col span={16} className='col'>
              <div className='border-box'>
                <Calendar
                  onPanelChange={onPanelChange}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </Col>
            {/* Habits Cards Wrapper Start */}
            <Col span={8} className='col'>
              <div className='border-box'>
                <Title
                  level={5}
                  className='sub-title'
                  style={{ margin: '0 0 18px 0' }}
                >
                  Complete today's Habits
                </Title>
                <div className='habit-cards-wrapper'>
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
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
