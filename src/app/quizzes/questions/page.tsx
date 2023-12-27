'use client';

import { Card, Col, Flex, Input, Radio, Row, Typography } from 'antd';
import { BreadCrumbNav } from '../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../components/common/button';
import { CustomTag } from '../../../../components/common/tag';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/task.module.scss';

const { TextArea } = Input;

const { Meta } = Card;

const { Title } = Typography;

const QuizQuestions = () => {
  const breadCrumbItems = [
    {
      title: 'Back to Quiz',
      link: '/quizzes',
    },
  ];
  return (
    <>
      <div className={`${style['quiz-questions-page']}`}>
        {/* Page Title */}
        <Row style={{ padding: '15px 0' }}>
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title='Quiz Questions' />
          </Col>
        </Row>

        <Row className='quiz-questions-card' gutter={[12, 12]}>
          {[1].map((i) => (
            <Col span={12} key={i} className='quizzes-confirmation-card'>
              <Card
                style={{ width: '100%' }}
                cover={
                  <img
                    alt='example'
                    style={{ aspectRatio: '16/9' }}
                    src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                  />
                }
              >
                <div className='content-wrapper'>
                  <Flex
                    align='start'
                    justify='space-between'
                    className='heading-content'
                  >
                    <div>
                      <h4>Questions 3/10</h4>
                      <h2>Quiz Title Add Here</h2>
                    </div>
                    <CustomTag variant='success' title='30xp' />
                  </Flex>
                  {/* Questions Wrapper */}
                  <Flex vertical className='q-wrapper'>
                    <li className='right-question'>
                      <Radio className='q-name-list'> HTML</Radio>
                    </li>
                    <li>
                      <Radio className='q-name-list'> CSS</Radio>
                    </li>
                    <li className='wrong-answer'>
                      <Radio className='q-name-list'> JS</Radio>
                    </li>
                    <li>
                      <Radio className='q-name-list'> React</Radio>
                    </li>
                  </Flex>
                  {/* Textarea Box Wrapper Start */}
                  <div className='textarea-box'>
                    <TextArea
                      rows={4}
                      placeholder='Write you answer'
                      maxLength={6}
                    />
                  </div>
                  {/* Buttons Wrapper */}
                  <Flex gap='middle' className='btns-wrapper'>
                    <PrimaryButton text='Skip' variant='secondary' />
                    <PrimaryButton text='Next' variant='primary' />
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default QuizQuestions;
