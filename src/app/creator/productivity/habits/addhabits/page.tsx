'use client';

import { useRouter } from 'next/navigation';

import { Col, Flex, Radio, Row, Space } from 'antd';
import { useState } from 'react';
import { BreadCrumbNav } from '../../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../../components/common/button';
import { FormInput } from '../../../../../../components/form/input';
import { FormSelect } from '../../../../../../components/form/select';
import PageTitle from '../../../../../../components/pagetitle';

const typeArray = ['one-time', 'recurring'];

const CreatorAddHabits = () => {
  const router = useRouter();

  const [habitType, setHabitType] = useState('one-time');

  const handleTypeChange = (e: any) => {
    setHabitType(e.target.value);
  };

  const breadCrumbItems = [
    {
      title: 'Back to Habits Tracker',
      link: '/creator/productivity/habits',
    },
  ];
  return (
    <>
      <Row style={{ paddingTop: '15px' }}>
        <Col span={16} className='border-box'>
          <BreadCrumbNav item={breadCrumbItems} />

          {/* Page Title */}
          <Row justify={'space-between'} style={{ alignItems: 'center' }}>
            <Col span={24}>
              <PageTitle title='Create Habit' />
            </Col>
          </Row>
          <Row style={{ paddingTop: '15px' }}>
            <Col span={24}>
              <FormSelect
                label='Category'
                handleChange={function (value: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <FormInput label='Title' placeholder='Add Title' />
              <div className='form-group'>
                <label htmlFor='type'>Type</label>
                <Radio.Group
                  onChange={handleTypeChange}
                  defaultValue='one-time'
                >
                  <Space direction='horizontal'>
                    {typeArray.map((e, i) => (
                      <Radio
                        key={i}
                        value={e}
                        style={{ textTransform: 'capitalize', fontWeight: 400 }}
                      >
                        {e}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>

              {habitType === 'one-time' && (
                <>
                  <FormInput label='Date' type='date' />
                  <FormInput label='Time ' type='time' />
                </>
              )}
              {habitType === 'recurring' && (
                <>
                  <FormInput label='Frequency' />
                  <FormInput label='Start Date' type='date' />
                </>
              )}

              <Flex gap={'middle'} justify='end'>
                <PrimaryButton
                  text='Cancel'
                  variant='secondary'
                  onClick={() => router.back()}
                />
                <PrimaryButton text='Save' variant='primary' />
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default CreatorAddHabits;
