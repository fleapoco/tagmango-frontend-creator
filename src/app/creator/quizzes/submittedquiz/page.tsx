'use client';

import { Col, Row } from 'antd';

import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryCard } from '../../../../../components/common/card';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';
import { AnswerTable } from './table';

const breadCrumbItems = [
  {
    title: 'Back to Quiz',
    link: '/creator/quizzes',
  },
];

const CreatorSubmittedQuiz = () => {
  return (
    <>
      <div className={`${style['quiz-answer-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={12}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title='Review Quiz submitted by Chetan Mane' />
          </Col>
        </Row>
        {/* Task Total Count Section */}
        <div className='task-count-wrapper p-r-b-l-15'>
          <Row gutter={[12, 0]} className=' '>
            <Col span={6} className='count-card'>
              <PrimaryCard title='Questions Attempted'>
                <span style={{ margin: 0 }}>
                  30{' '}
                  <span className='small-txt'>
                    out of <strong>40</strong>
                  </span>
                </span>
              </PrimaryCard>
            </Col>
            <Col span={6} className='count-card'>
              <PrimaryCard title='Points Obtained'>
                <span style={{ margin: 0 }}>30XP</span>
              </PrimaryCard>
            </Col>
          </Row>
        </div>
        <div className='answer-table-box'>
          <AnswerTable />
        </div>
      </div>
    </>
  );
};
export default CreatorSubmittedQuiz;
