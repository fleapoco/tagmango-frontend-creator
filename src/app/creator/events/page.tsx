'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '../../../../components/common/button';
import { AddIcon } from '../../../../components/common/icons';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/creator.module.scss';

import { Col, DatePicker, Flex, List, Row, Tabs, Typography } from 'antd';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const { Title } = Typography;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

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
                {/* Select Time And Button */}
                <Row className='p-15'>
                  <Col span={12}>
                    <RangePicker picker='time' />
                  </Col>
                  <Col
                    span={12}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <PrimaryButton
                      text='Create Event'
                      icon={<AddIcon />}
                      variant='primary'
                      onClick={HangleButttonClick}
                    />
                  </Col>
                </Row>
                <div className='p-r-b-l-15 upcoming-events-list'>
                  <List itemLayout='horizontal'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <List.Item className='list-item'>
                        <div style={{ width: '100%' }}>
                          <div className='date-label'>
                            <span>Tomorrow</span>
                          </div>
                          <div className='event-details-wrapper'>
                            <Row
                              gutter={[15, 0]}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Col span={6}>
                                <div className='date-time-count'>
                                  <Title level={4}>06:00 PM - 07:00 PM</Title>
                                  <Title level={5}>Occurrence 1 of 4</Title>
                                </div>
                              </Col>
                              <Col span={12}>
                                <Flex
                                  className='event-details'
                                  gap={16}
                                  align='center'
                                >
                                  <div className='img-box'>
                                    <Image
                                      src={'/Image.jpg'}
                                      layout='fill'
                                      alt='Event Image'
                                    />
                                  </div>
                                  <div className='content-wrap'>
                                    <Title level={5}>
                                      Lorem, ipsum dolor sit amet consectetur
                                      adipisicing elit. Omnis.
                                    </Title>
                                  </div>
                                </Flex>
                              </Col>
                              <Col
                                span={6}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <div className='event-action'>
                                  <Flex gap={16}>
                                    <PrimaryButton
                                      text='Start'
                                      variant='primary'
                                    />
                                    <PrimaryButton variant='info' />
                                  </Flex>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </TabPane>
              <TabPane tab='Previous' key='2'>
                2
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreatorEvent;
