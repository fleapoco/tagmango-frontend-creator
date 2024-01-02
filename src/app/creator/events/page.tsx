'use client';
import { useRouter } from 'next/navigation';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/creator.module.scss';

import { Col, DatePicker, Row, Tabs, Typography } from 'antd';
import { PreviousEvents } from './previous';
import { UpcomingEvents } from './upcoming';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const { Title } = Typography;

const CreatorEvent = () => {
  const router = useRouter();

  const HangleButttonClick = () => {
    router.push('/creator/events/createevent');
  };

  return (
    <>
      <div className={`${style['creator-event']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row className='p-15'>
          <Col span={24}>
            <PageTitle title='Events' />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Upcoming' key='1'>
                {/* Upcoming Events */}
                <div className='p-15'>
                  <UpcomingEvents />
                </div>
              </TabPane>
              <TabPane tab='Previous' key='2'>
                <div className='previous-wrapper'>
                  <PreviousEvents />
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreatorEvent;
