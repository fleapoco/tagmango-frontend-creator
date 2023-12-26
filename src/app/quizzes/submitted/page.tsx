'use client';

import { Col, Result, Row, Typography } from 'antd';
import { BreadCrumbNav } from '../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../components/common/button';
import { PrimaryCard } from '../../../../components/common/card';
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

        <Row className='select-quizzes-card-wrapper' gutter={[12, 12]}>
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
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <PrimaryButton text='Okay' variant='primary' />
                      </div>
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
