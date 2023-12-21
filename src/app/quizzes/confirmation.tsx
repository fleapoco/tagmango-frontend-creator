'use client';

import { Col, Flex, Row, Typography } from 'antd';
import style from '../../../style/task.module.scss';

import { PrimaryButton } from '../../../components/common/button';
import { PrimaryCard } from '../../../components/common/card';
import PageTitle from '../../../components/pagetitle';

const { Title } = Typography;

const QuizzesConfirmation = () => {
  return (
    <>
      <div
        className={`${style['quizzes-confirmation-page']} common-panel-wrapper`}
      >
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={24}>
            <PageTitle title='Quiz Submission Confirmation' />
          </Col>
        </Row>
        <div className='gray-box p-15'>
          <Row className='select-quizzes-card-wrapper' gutter={[12, 12]}>
            {[1].map((i) => (
              <Col span={12} key={i} className='quizzes-confirmation-card'>
                <PrimaryCard>
                  <div className='content-wrapper'>
                    <Title level={3}>Heading Title</Title>
                    <p>Heading Title</p>
                    <Flex gap='middle' justify='center'>
                      <PrimaryButton
                        text='Back To Questions'
                        variant='secondary'
                      />
                      <PrimaryButton text='Submit Quizze' variant='dark' />
                    </Flex>
                  </div>
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default QuizzesConfirmation;
