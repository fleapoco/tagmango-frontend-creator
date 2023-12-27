'use client';

import { Col, Row } from 'antd';
import { PrimaryCard } from '../../../../components/common/card';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/task.module.scss';

const ReviewAnswers = () => {
  return (
    <>
      <div className={`${style['task-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={12}>
            <PageTitle title='Tasks' />
          </Col>
        </Row>
        {/* Task Total Count Section */}
        <div className='gray-box task-count-wrapper p-15'>
          <Row gutter={[12, 0]} className=' '>
            {[
              {
                taskName: 'Questions Attempted',
                count: `${23} of ${30}`,
              },
              {
                taskName: 'Points Obtained',
                count: '30XP',
              },
            ].map((ele, i) => (
              <Col key={i} span={6} className='count-card'>
                <PrimaryCard title={ele.taskName}>
                  <span style={{ margin: 0 }}>{ele.count}</span>
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};
export default ReviewAnswers;
