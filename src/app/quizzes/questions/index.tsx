'use client';

import { Card, Checkbox, Col, Flex, Row, Typography } from 'antd';
import { PrimaryButton } from '../../../../components/common/button';
import { CustomTag } from '../../../../components/common/tag';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/task.module.scss';

const { Meta } = Card;

const { Title } = Typography;

const QuizQuestions = () => {
  return (
    <>
      <div className={`${style['quiz-questions-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={24}>
            <PageTitle title='Quiz Questions' />
          </Col>
        </Row>
        <div className='gray-box p-15'>
          <Row className='quiz-questions-card' gutter={[12, 12]}>
            {[1].map((i) => (
              <Col span={12} key={i} className='quizzes-confirmation-card'>
                <Card
                  style={{ width: '100%' }}
                  cover={
                    <img
                      alt='example'
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
                      <li>
                        <Checkbox className='q-name-list'> HTML</Checkbox>
                      </li>
                      <li>
                        <Checkbox className='q-name-list'> CSS</Checkbox>
                      </li>
                      <li>
                        <Checkbox className='q-name-list'> JS</Checkbox>
                      </li>
                      <li>
                        <Checkbox className='q-name-list'> React</Checkbox>
                      </li>
                    </Flex>
                    {/* Buttons Wrapper */}
                    <Flex gap='middle' className='btns-wrapper'>
                      <PrimaryButton text='Skip' variant='secondary' />
                      <PrimaryButton text='Next' variant='dark' />
                    </Flex>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default QuizQuestions;
