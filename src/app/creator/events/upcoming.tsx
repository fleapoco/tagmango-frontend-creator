'use client';
import { Col, DatePicker, Flex, List, Row, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ActionButton } from '../../../../components/common/actionbutton';
import { PrimaryButton } from '../../../../components/common/button';
import { AddIcon } from '../../../../components/common/icons';
import { ActionModal } from '../../../../components/common/modal';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const UpcomingEvents = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const router = useRouter();

  const HangleButttonClick = () => {
    router.push('/creator/events/createevent');
  };
  return (
    <>
      {/* Select Time And Button */}
      <Row>
        <Col span={12}>
          <RangePicker picker='time' />
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PrimaryButton
            text='Create Event'
            icon={<AddIcon />}
            variant='primary'
            onClick={HangleButttonClick}
          />
        </Col>
      </Row>
      <div className='upcoming-events-list'>
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
                            elit. Omnis.
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
                          <PrimaryButton text='Start' variant='primary' />
                          <ActionButton />
                          {/* Edit workshop Modal */}
                          <ActionModal
                            title='Edit Recurring Workshop'
                            className='event-actions-modal'
                            show={false}
                            onClose={handleCloseModal}
                            footer={
                              <>
                                <Flex justify='end'>
                                  <PrimaryButton
                                    text='Edit this occurrence'
                                    variant='primary'
                                  />
                                  <PrimaryButton
                                    text='Edit all occurrence'
                                    variant='primary'
                                    ghost
                                  />
                                  <PrimaryButton
                                    text='Cancel'
                                    variant='secondary'
                                    onClick={handleCloseModal}
                                  />
                                </Flex>
                              </>
                            }
                          >
                            <div className='content-wrapper'>
                              <h3>You are editing a Recurring Workshop</h3>
                              <p>
                                You can edit all the details up to 30 minutes
                                before the session starts.
                              </p>
                            </div>
                          </ActionModal>
                          {/* Delete workshop Modal */}
                          <ActionModal
                            title='Delete Recurring Workshop'
                            className='event-actions-modal'
                            show={false}
                            onClose={handleCloseModal}
                            footer={
                              <>
                                <Flex justify='end'>
                                  <PrimaryButton
                                    text='Delete this occurrence'
                                    variant='primary'
                                    danger
                                  />
                                  <PrimaryButton
                                    text='Delete all occurrence'
                                    variant='primary'
                                    ghost
                                    danger
                                  />
                                  <PrimaryButton
                                    text='Cancel'
                                    variant='secondary'
                                    onClick={handleCloseModal}
                                  />
                                </Flex>
                              </>
                            }
                          >
                            <div className='content-wrapper'>
                              <h3>Deleted workshop can'be retrieved later</h3>
                              <p>
                                You can delete this workshop up to 30 minutes
                                before the session starts
                              </p>
                            </div>
                          </ActionModal>
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
    </>
  );
};
