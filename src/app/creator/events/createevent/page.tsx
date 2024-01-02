'use client';

import { Col, Flex, Row } from 'antd';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../components/common/button';
import { SwitchToggle } from '../../../../../components/common/switch';

import ImageUpload from '../../../../../components/form/imgupload';
import { FormInput } from '../../../../../components/form/input';
import { FormTextArea } from '../../../../../components/form/textarea';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

const CreateEvent = () => {
  const breadCrumbItems = [
    {
      title: 'Back to Event',
      link: '/creator/events',
    },
  ];
  return (
    <>
      <div className={`${style['creator-task-form']}`}>
        <Row style={{ paddingTop: '16px' }}>
          <Col span={16} className='border-box'>
            <BreadCrumbNav item={breadCrumbItems} />

            {/* Page Title */}
            <Row justify={'space-between'} style={{ alignItems: 'center' }}>
              <Col span={24}>
                <PageTitle title='Create Event' />
              </Col>
            </Row>

            <div style={{ paddingTop: '15px' }}>
              <FormInput placeholder='Add a Title' label='Title' type='text' />
              {/* <FormSelect
                label='Who can join this Event?'
                handleChange={function (value: string): void {
                  throw new Error('Function not implemented.');
                }}
              /> */}
              <FormInput
                placeholder='Add a Event Link'
                label='Event Link'
                type='text'
              />

              <div className='form-group schedule-wrapper'>
                <label htmlFor='schedule'>Schedule Event</label>
                <Row gutter={16}>
                  <Col span={10}>
                    <FormInput placeholder='Date' label='' type='date' />
                  </Col>
                  <Col span={14}>
                    <Flex
                      align='center'
                      justify='space-between'
                      gap={16}
                      style={{ width: '100%' }}
                    >
                      <FormInput
                        placeholder='Start Time'
                        label=''
                        type='time'
                      />
                      <span style={{ marginBottom: '12px' }}>to</span>
                      <FormInput placeholder='End Time' label='' type='time' />
                    </Flex>
                  </Col>
                </Row>
              </div>
              <div className='form-group'>
                <Flex
                  gap={2}
                  align='center'
                  justify='space-between'
                  className='input-box '
                >
                  <label htmlFor=''>Recurring</label>
                  <SwitchToggle />
                </Flex>
              </div>

              {/* About Event Start */}
              <div className='about-event'>
                <h4>About Event</h4>
                <div className='form-group'>
                  <label htmlFor='header-img'>Header Image</label>
                  <ImageUpload />
                </div>
                <div className='form-group'>
                  <label>Description</label>
                  <FormTextArea placeholder='Event Description' />
                </div>
              </div>

              <Flex gap='middle' justify='end'>
                <PrimaryButton variant='secondary' text='Cancel' />
                <PrimaryButton variant='primary' text='Save' />
              </Flex>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreateEvent;
