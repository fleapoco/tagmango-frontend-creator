'use client';

import { initialDataAnalyticsState } from '@/empty-state-objects/empty';
import useApi from '@/hooks/useApi';
import { DataAnalyticsTypes } from '@/types';
import { Col, Flex, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BreadCrumbNav } from '../../components/common/breadcrumb';
import { PrimaryButton } from '../../components/common/button';
import { FormInput } from '../../components/form/input';
import PageTitle from '../../components/pagetitle';

export const AddData = () => {
  const router = useRouter();
  const { createAnalytics } = useApi();
  const [data, setData] = useState<DataAnalyticsTypes>(
    initialDataAnalyticsState
  );

  const handleCreateAnalytics = async () => {
    try {
      await createAnalytics(data);
      setData(initialDataAnalyticsState);
      router.push('/data');
    } catch (error) {}
  };

  const breadCrumbItems = [
    {
      title: 'Back to Data',
      link: '/productivity/task',
    },
  ];

  return (
    <>
      <Row style={{ paddingTop: '16px' }}>
        <Col span={16} className='border-box'>
          <BreadCrumbNav item={breadCrumbItems} />

          {/* Page Title */}
          <Row justify={'space-between'} style={{ alignItems: 'center' }}>
            <Col span={24}>
              <PageTitle title='Add Data' />
            </Col>
          </Row>

          <div style={{ paddingTop: '15px' }}>
            <FormInput
              placeholder='Select Month'
              label='Month'
              type='month'
              value={data.month ?? ''}
              onDateChange={(date, dateString) =>
                setData({ ...data, month: dateString })
              }
            />

            <FormInput
              placeholder=''
              label='Revenue Earned'
              icon={'₹'}
              value={data.revenueEarned}
              onChange={(e) =>
                setData({
                  ...data,
                  revenueEarned: Number(e.target.value),
                })
              }
              type='number'
            />

            <FormInput
              label='Ad Spends'
              icon={'₹'}
              type='number'
              value={data.adSpends}
              onChange={(e) =>
                setData({ ...data, adSpends: Number(e.target.value) })
              }
            />

            <FormInput
              label='Average Cost Per Lead'
              icon={'₹'}
              value={data.costPerLead}
              onChange={(e) =>
                setData({ ...data, costPerLead: Number(e.target.value) })
              }
              type='number'
            />

            <FormInput
              label='Total Leads Generated'
              value={data.totalLeadsGenerated}
              onChange={(e) =>
                setData({
                  ...data,
                  totalLeadsGenerated: Number(e.target.value),
                })
              }
            />

            <FormInput
              label='Total Paid Customers'
              value={data.totalPaidCustomers}
              onChange={(e) =>
                setData({
                  ...data,
                  totalPaidCustomers: Number(e.target.value),
                })
              }
            />
            <FormInput
              label='Total Group Size'
              type='number'
              value={data.vipGroupSize}
              onChange={(e) =>
                setData({
                  ...data,
                  vipGroupSize: Number(e.target.value),
                })
              }
            />
            <FormInput
              value={data.adSpendsReturn}
              label='ROAS'
              onChange={(e) =>
                setData({
                  ...data,
                  adSpendsReturn: Number(e.target.value),
                })
              }
            />
            <Flex gap='middle' justify='end'>
              <PrimaryButton variant='secondary' text='Cancel' />
              <PrimaryButton
                variant='primary'
                text='Save'
                onClick={handleCreateAnalytics}
              />
            </Flex>
          </div>
        </Col>
      </Row>
    </>
  );
};
