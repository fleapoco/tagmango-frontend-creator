'use client';

import { Col, Flex, Row, Typography } from 'antd';
import { BreadCrumbNav } from '../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../components/common/button';
import { PrimaryCard } from '../../../../components/common/card';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/task.module.scss';

const { Title } = Typography;

const QuizzesConfirmation = () => {
  const breadCrumbItems = [
    {
      title: 'Back to Quiz',
      link: '/quizzes',
    },
  ];
  return (
    <>
      <div className={`${style['quizzes-confirmation-page']}`}>
        {/* Page Title */}
        <Row style={{ padding: '16px 0' }}>
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title='Quiz Submission Confirmation' />
          </Col>
        </Row>

        <Row className='select-quizzes-card-wrapper' gutter={[12, 12]}>
          {[1].map((i) => (
            <Col span={12} key={i} className='quizzes-confirmation-card'>
              <PrimaryCard>
                <div className='content-wrapper'>
                  <h2>Quiz Title Here</h2>
                  <p>
                    You're about to submit your quiz. Once you click Submit Quiz
                    button you can not return to your quiz.
                  </p>
                  <Flex gap='middle' justify='center'>
                    <PrimaryButton
                      text='Back To Questions'
                      variant='secondary'
                    />
                    <PrimaryButton text='Submit Quiz' variant='primary' />
                  </Flex>
                </div>
              </PrimaryCard>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default QuizzesConfirmation;
