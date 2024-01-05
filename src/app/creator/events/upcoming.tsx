'use client';
import useAPI from '@/hooks/useApi';
import { EventData } from '@/types';
import { Col, DatePicker, Flex, List, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ActionButton } from '../../../../components/common/actionbutton';
import { PrimaryButton } from '../../../../components/common/button';
import { AddIcon } from '../../../../components/common/icons';
import { ActionModal } from '../../../../components/common/modal';

const { RangePicker } = DatePicker;
const { Title } = Typography;

type UpcomingEventsType = {
  data?: { [key: string]: EventData[] | [] } | null;
  fetchEventData?: () => void;
};

export const UpcomingEvents = ({
  data,
  fetchEventData,
}: UpcomingEventsType) => {
  const router = useRouter();
  const { deleteEvent } = useAPI();
  const [currentModalEventId, setCurrentModalEventId] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const handleEditOpenModal = (id: string) => {
    setCurrentModalEventId(id);
    setEditModalVisible(true);
  };

  const handleDeleteOpenModal = (id: string) => {
    setCurrentModalEventId(id);
    setDeleteModalVisible(true);
  };

  const handleEditCloseModal = () => {
    setCurrentModalEventId('');
    setEditModalVisible(false);
  };

  const handleDeleteCloseModal = () => {
    setCurrentModalEventId('');
    setDeleteModalVisible(false);
  };

  const startButtonAction = (link: string | undefined) => {
    if (!link) return;
    window.open(link, '_blank');
  };

  const editEventAction = async (id: string) => {
    router.push(`/creator/events/createevent?id=${id}`);
  };

  const deleteEventAction = async (id: string) => {
    try {
      let res = await deleteEvent(id);
      if (res) alert(res?.message);
    } catch (error) {
      console.error(error);
    } finally {
      if (fetchEventData) fetchEventData();
      handleDeleteCloseModal();
    }
  };

  const handleEdit = () => {
    if (!currentModalEventId) return;
    editEventAction(currentModalEventId);
  };

  const handleDelete = () => {
    if (!currentModalEventId) return;
    deleteEventAction(currentModalEventId);
  };

  const HandleButtonClick = () => {
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
            onClick={HandleButtonClick}
          />
        </Col>
      </Row>
      <div className='upcoming-events-list'>
        <List itemLayout='horizontal'>
          {data &&
            Object.keys(data).map((key) => {
              if (data && data[key] && data[key].length > 0) {
                return (
                  <List.Item className='list-item'>
                    <div style={{ width: '100%' }} key={key}>
                      <div className='date-label'>
                        <span>{key}</span>
                      </div>

                      {data[key].map((event: EventData) => (
                        <div className='event-details-wrapper' key={event?.id}>
                          <Row
                            gutter={[15, 0]}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Col span={6}>
                              <div className='date-time-count'>
                                {event?.startTime && event?.endTime && (
                                  <Title level={4}>
                                    {new Date(
                                      event?.startTime
                                    ).toLocaleTimeString('en-US', options)}{' '}
                                    -{' '}
                                    {new Date(
                                      event?.endTime
                                    ).toLocaleTimeString('en-US', options)}
                                  </Title>
                                )}
                                <Title level={5}>Occurrence 1 of 1</Title>
                              </div>
                            </Col>
                            <Col span={12}>
                              <Flex
                                className='event-details'
                                gap={16}
                                align='center'
                              >
                                <div className='img-box'>
                                  <img
                                    src={event?.backgroundImageUrl}
                                    style={{ objectFit: 'fill' }}
                                    alt={event?.title}
                                  />
                                </div>
                                <div className='content-wrap'>
                                  <Title level={5}>{event?.title}</Title>
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
                                    onClick={() =>
                                      startButtonAction(event?.eventLink)
                                    }
                                  />
                                  <ActionButton
                                    actionFor='event'
                                    id={event?.id}
                                    confirm={false}
                                    handleEventEdit={handleEditOpenModal}
                                    handleEventDelete={handleDeleteOpenModal}
                                  />
                                  {/* Edit workshop Modal */}
                                  <ActionModal
                                    title={
                                      event.recurringStatus
                                        ? 'Edit Recurring Workshop'
                                        : 'Edit Single Workshop'
                                    }
                                    className='event-actions-modal'
                                    show={editModalVisible}
                                    onClose={handleEditCloseModal}
                                    footer={
                                      <>
                                        <Flex justify='end'>
                                          <PrimaryButton
                                            text='Edit this occurrence'
                                            variant='primary'
                                            onClick={handleEdit}
                                          />
                                          <PrimaryButton
                                            disabled={!event.recurringStatus}
                                            text='Edit all occurrence'
                                            variant='primary'
                                            onClick={handleEdit}
                                            ghost
                                          />
                                          <PrimaryButton
                                            text='Cancel'
                                            variant='secondary'
                                            onClick={handleEditCloseModal}
                                          />
                                        </Flex>
                                      </>
                                    }
                                  >
                                    <div className='content-wrapper'>
                                      <h3>
                                        You are editing a{' '}
                                        {event.recurringStatus
                                          ? 'Recurring'
                                          : 'Single'}{' '}
                                        Workshop
                                      </h3>
                                      <p>
                                        You can edit all the details up to 30
                                        minutes before the session starts.
                                      </p>
                                    </div>
                                  </ActionModal>
                                  {/* Delete workshop Modal */}
                                  <ActionModal
                                    title={
                                      event.recurringStatus
                                        ? 'Delete Recurring Workshop'
                                        : 'Delete Single Workshop'
                                    }
                                    className='event-actions-modal'
                                    show={deleteModalVisible}
                                    onClose={handleDeleteCloseModal}
                                    footer={
                                      <>
                                        <Flex justify='end'>
                                          <PrimaryButton
                                            text='Delete this occurrence'
                                            variant='primary'
                                            onClick={handleDelete}
                                            danger
                                          />
                                          <PrimaryButton
                                            disabled={!event.recurringStatus}
                                            text='Delete all occurrence'
                                            variant='primary'
                                            onClick={handleDelete}
                                            ghost
                                            danger
                                          />
                                          <PrimaryButton
                                            text='Cancel'
                                            variant='secondary'
                                            onClick={handleDeleteCloseModal}
                                          />
                                        </Flex>
                                      </>
                                    }
                                  >
                                    <div className='content-wrapper'>
                                      <h3>
                                        Deleted workshop can'be retrieved later
                                      </h3>
                                      <p>
                                        You can delete this workshop up to 30
                                        minutes before the session starts
                                      </p>
                                    </div>
                                  </ActionModal>
                                </Flex>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  </List.Item>
                );
              }
            })}
        </List>
      </div>
    </>
  );
};
