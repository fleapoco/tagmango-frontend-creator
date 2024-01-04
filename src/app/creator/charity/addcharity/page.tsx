'use client';
import { initialCharitiesState } from '@/empty-state-objects/empty';
import useAPI from '@/hooks/useApi';
import { useAppSelector } from '@/hooks/useRedux';
import { getCharityStored } from '@/redux/reducers/charity.reducer';
import { CharitiesType, TypeCategory } from '@/types';
import { Col, Flex, Row, message } from 'antd';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../components/common/button';
import { FormInput } from '../../../../../components/form/input';
import { FormSelect } from '../../../../../components/form/select';
import PageTitle from '../../../../../components/pagetitle';

const AddCharity = () => {
  const router = useRouter();
  const params = useSearchParams();

  const charity = useAppSelector(getCharityStored);

  const type = params.get('type');

  const [loading, setLoading] = useState<boolean>(false);
  const { createCharities, getCategories, updateCharity } = useAPI();
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [formData, setFormData] = useState<CharitiesType>(
    initialCharitiesState
  );

  const handleCreateCharity = async () => {
    setLoading(true);
    try {
      if (type && type === 'update') {
        await updateCharity(charity.id!, formData);
        message.success('charity updated');
      } else {
        await createCharities(formData);
        setFormData((initialCharitiesState) => ({
          ...initialCharitiesState,
          date: formData.date ?? dayjs().toISOString(),
          categoryId: categories.at(0)?.value,
        }));
        message.success('charity added');
      }

      router.push('/charity');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories({ type: TypeCategory.CHARITY });
      setCategories(
        data.map((category) => ({
          label: category.title,
          value: category.id,
        }))
      );
      setFormData((formData) => ({ ...formData, categoryId: data.at(0)?.id }));
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (type && type === 'update')
      setFormData({
        organizationName: charity.organizationName,
        amount: charity.amount,
        categoryId: charity.category?.id,
        date: charity.date,
      });
  }, [type]);

  const breadCrumbItems = [
    {
      title: 'Back to Charity',
      link: '/creator/charity',
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
              <PageTitle
                title={type === 'update' ? 'Edit Charity' : 'Add Charity'}
              />
            </Col>
          </Row>
          {/* Add Form Filed */}
          <div style={{ paddingTop: '15px' }}>
            <FormSelect
              label='Category'
              options={categories}
              handleChange={(value) =>
                setFormData((formData) => ({
                  ...formData,
                  categoryId: value,
                }))
              }
              value={formData.categoryId}
            />

            <FormInput
              placeholder=''
              label='Amount Donated'
              icon={'₹'}
              type='number'
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: Number(e.target.value),
                })
              }
            />

            <FormInput
              placeholder=''
              label='Organisation Name'
              type='text'
              value={formData.organizationName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  organizationName: e.target.value,
                })
              }
            />

            <FormInput
              placeholder='Charity date'
              label='Date'
              type='date'
              value={formData.date ?? dayjs().toISOString()}
              onDateChange={(date, dateString) =>
                setFormData({ ...formData, date: dateString })
              }
            />

            <Flex gap='middle' justify='end'>
              <PrimaryButton
                variant='secondary'
                text='Cancel'
                onClick={() => router.push('/charity')}
              />
              <PrimaryButton
                disabled={!formData.organizationName || !formData.amount}
                variant='primary'
                text='Save'
                loading={loading}
                onClick={handleCreateCharity}
              />
            </Flex>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default AddCharity;
