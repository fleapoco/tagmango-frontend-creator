'use client';
import { Col, DatePicker, Flex, List, Row, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const PreviousEvents = () => {
  const router = useRouter();

  const HangleButttonClick = () => {
    router.push('/creator/events/createevent');
  };
  return (
    <>
      <div className='upcoming-events-list' style={{ paddingTop: '3px' }}>
        <List itemLayout='horizontal'>
          {[1, 2, 3, 4, 5].map((i) => (
            <List.Item className='list-item'>
              <div style={{ width: '100%' }}>
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
                    <Col span={18}>
                      <Flex className='event-details' gap={16} align='center'>
                        <div className='img-box'>
                          <Image
                            src={'/Image.jpg'}
                            layout='fill'
                            alt='Event Image'
                          />
                        </div>
                        <div className='content-wrap'>
                          <Title level={5}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Omnis. Lorem, ipsum dolor sit amet consectetur
                          </Title>
                        </div>
                      </Flex>
                    </Col>
                  </Row>
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
};
