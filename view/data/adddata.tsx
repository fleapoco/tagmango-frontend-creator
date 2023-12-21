'use client';

import { initialDataAnalyticsState } from '@/empty-state-objects/empty';
import useApi from '@/hooks/useApi';
import { DataAnalyticsTypes } from '@/types';
import { Col, Flex, Row } from 'antd';
import { useState } from 'react';
import { BreadCrumbNav } from '../../components/common/breadcrumb';
import { PrimaryButton } from '../../components/common/button';
import { FormInput } from '../../components/form/input';
import PageTitle from '../../components/pagetitle';

export const AddData = () => {
  const { createAnalytics } = useApi();
  const [data, setData] = useState<DataAnalyticsTypes>(
    initialDataAnalyticsState
  );

  const handleCreateAnalytics = async () => {
    try {
      await createAnalytics(data);
    } catch (error) {}
  };

  const breadCrumbItems = [
    {
      title: 'Data',
      link: '/productivity/task',
    },
    {
      title: 'Add Data',
    },
  ];

  return (
    <>
      <BreadCrumbNav item={breadCrumbItems} />
      <div className={`common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={24}>
            <PageTitle title='Add Data' />
          </Col>
        </Row>
        <div className='gray-box p-15'>
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <FormInput
                placeholder='Select Month'
                label='Month'
                type='month'
                onDateChange={(date, dateString) =>
                  setData({ ...data, month: dateString })
                }
              />
            </Col>
            <Col span={24}>
              <FormInput
                placeholder=''
                label='Revenue Earned'
                icon={'₹'}
                value={data.revenueEarned}
                onChange={(e) =>
                  setData({ ...data, revenueEarned: Number(e.target.value) })
                }
                type='number'
              />
            </Col>
            <Col span={24}>
              <FormInput
                label='Ad Spends'
                icon={'₹'}
                type='number'
                value={data.adSpends}
                onChange={(e) =>
                  setData({ ...data, adSpends: Number(e.target.value) })
                }
              />
            </Col>
            <Col span={24}>
              <FormInput
                label='Average Cost Per Lead'
                icon={'₹'}
                value={data.costPerLead}
                onChange={(e) =>
                  setData({ ...data, costPerLead: Number(e.target.value) })
                }
                type='number'
              />
            </Col>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
              <Flex gap='middle' justify='end'>
                <PrimaryButton variant='secondary' text='Cancel' />
                <PrimaryButton
                  variant='primary'
                  text='Save'
                  onClick={handleCreateAnalytics}
                />
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
