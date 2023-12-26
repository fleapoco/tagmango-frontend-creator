'use client';

import { Col, Row, Typography } from 'antd';
import style from '../../../style/task.module.scss';

import { PrimaryButton } from '../../../components/common/button';
import { PrimaryCard } from '../../../components/common/card';
import { CustomTag } from '../../../components/common/tag';
import PageTitle from '../../../components/pagetitle';
import QuizzesConfirmation from './confirmation';
import QuizQuestions from './questions';

const { Title } = Typography;

const QuizzesPage = () => {
  return (
    <>
      <div className={`${style['quizzes-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={24}>
            <PageTitle title='Quizzes' />
          </Col>
        </Row>
        <div className='gray-box p-15'>
          <Row className='select-quizzes-card-wrapper' gutter={[12, 12]}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Col span={8} key={i}>
                <PrimaryCard title='Testing title of quizzes'>
                  <Title level={5}>30 Questions</Title>
                  <PrimaryButton
                    text={
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span>Play & Earn</span>
                        <CustomTag title='30XP' variant='success' />
                      </div>
                    }
                    variant='secondary'
                  />
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <QuizQuestions />

      <QuizzesConfirmation />
    </>
  );
};
export default QuizzesPage;
