'use client';
import { Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '../../../../../components/common/button';
import FullCalendarData from '../../../../../components/common/fullcalendar';
import { AddIcon } from '../../../../../components/common/icons';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

const CreatorHabit = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/creator/productivity/habits/addhabits');
  };

  return (
    <>
      <div className={`${style['event-tasks-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={12}>
            <PageTitle title='Habits Tracker' />
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryButton
              text='Add Habits'
              icon={<AddIcon />}
              variant='primary'
              onClick={handleButtonClick}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className='p-15'>
              <FullCalendarData />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreatorHabit;
