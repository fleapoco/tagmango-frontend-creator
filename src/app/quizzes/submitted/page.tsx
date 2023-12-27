'use client';

import { Col, Flex, Result, Row, Typography } from 'antd';
import { BreadCrumbNav } from '../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../components/common/button';
import { PrimaryCard } from '../../../../components/common/card';
import { CustomTag } from '../../../../components/common/tag';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/task.module.scss';

const { Title } = Typography;

const QuizSubmitted = () => {
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
            <PageTitle title='Quiz Title' />
          </Col>
        </Row>

        <Row
          className='select-quizzes-card-wrapper submitted-wrapper'
          gutter={[12, 12]}
        >
          {[1].map((i) => (
            <Col span={12} key={i} className='quizzes-confirmation-card'>
              <PrimaryCard>
                <div className='content-wrapper'>
                  <Result
                    status='success'
                    title={
                      <>
                        <h2>Your Quiz has been submitted successfully</h2>
                      </>
                    }
                    subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
                    extra={
                      <>
                        <div className='point-box-wrapper border-box'>
                          <Flex justify='space-between' align='center'>
                            <h4>No Of Questions Attempted</h4>
                            <h4>
                              <span>20</span>/30
                            </h4>
                          </Flex>
                          <Flex justify='space-between' align='center'>
                            <h4>Points earned</h4>
                            <CustomTag title='20xp' variant='success' />
                          </Flex>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <PrimaryButton text='Okay' variant='primary' />
                        </div>
                      </>
                    }
                  />
                </div>
              </PrimaryCard>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default QuizSubmitted;
