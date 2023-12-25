import { CloseOutlined } from '@ant-design/icons';
import { Button, Calendar, CalendarProps, Col, Row, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import { PrimaryButton } from '../../components/common/button';
import { PrimaryCard } from '../../components/common/card';
import { CustomTag } from '../../components/common/tag';
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
            <PageTitle title='Habit' />
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
            <div className='complete-you-tasks-cards border-box'>
              <Title level={5} className='sub-title' style={{ marginTop: '0' }}>
                Complete today's Habits
              </Title>
              <Row gutter={[0, 12]}>
                {[1, 2, 3, 4].map((i) => (
                  <Col span={24} key={i}>
                    <PrimaryCard
                      extra={
                        <>
                          <Button type='text' shape='circle' size='small'>
                            <CloseOutlined size={2} />
                          </Button>
                        </>
                      }
                    >
                      <div className='content'>
                        <CustomTag variant='success' title='20XP' />
                        <Title level={5}>Learn - Podcast or course</Title>
                        <PrimaryButton
                          text='Mark as complete '
                          size='small'
                          variant='secondary'
                        />
                      </div>
                    </PrimaryCard>
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
