'use client';

import useAPI from '@/hooks/useApi';
import { APIError, UserAchievement } from '@/types';
import { Col, Flex, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../components/common/button';
import ImageUpload from '../../../../../components/form/imgupload';
import { FormInput } from '../../../../../components/form/input';
import { FormTextArea } from '../../../../../components/form/textarea';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

const breadCrumbItems = [
  {
    title: 'Back to Achievement',
    link: '/creator/achievement',
  },
];

type AchievementDataType = {
  title: string;
  description: string;
  thumbnailUrl: string;
};

const NewCertification = () => {
  const router = useRouter();
  const { createAchievement } = useAPI();

  const [achievementDataType, setAchievementDataType] =
    useState<AchievementDataType>({
      title: '',
      description: '',
      thumbnailUrl: '',
    });

  const isValidFormData = (achievementData: AchievementDataType) => {
    if (
      !achievementData.title ||
      !achievementData.description ||
      !achievementData.thumbnailUrl
    )
      return false;
    return true;
  };

  const handleUpload = (fileUrl: string) => {
    setAchievementDataType((prev) => {
      return { ...prev, thumbnailUrl: fileUrl };
    });
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'title')
      setAchievementDataType((prev) => {
        return { ...prev, title: e.target.value };
      });
    else if (e.target.name === 'description')
      setAchievementDataType((prev) => {
        return { ...prev, description: e.target.value };
      });
  };

  const handleSubmit = async () => {
    if (!isValidFormData) alert('Invalid/Missing Input Data');

    try {
      let data: APIError | UserAchievement = await createAchievement(
        achievementDataType
      );

      if ('error' in data) {
        alert(data?.message);
        return;
      }

      router.push('/creator/achievement');
    } catch (error) {}
  };

  return (
    <>
      <div className={`${style['creator-task-details-form']} `}>
        {/* Page Title */}
        <Row style={{ padding: '15px 0' }}>
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title='New Achievement' />
          </Col>
        </Row>
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <div className='border-box p-15'>
              <ImageUpload handleUpload={handleUpload} />
              <FormInput
                label='Achievement Title'
                placeholder='Add Title'
                onChange={handleOnChange}
                name='title'
              />
              <div className='form-group'>
                <label htmlFor='requirement'>Requirement</label>
                <FormTextArea
                  placeholder='Description'
                  onChange={handleOnChange}
                  name='description'
                />
              </div>
              <Flex gap={'middle'} justify='end'>
                <PrimaryButton
                  text='Cancel'
                  variant='secondary'
                  onClick={() => router.back()}
                />
                <PrimaryButton
                  text='Save'
                  variant='primary'
                  disabled={!isValidFormData(achievementDataType)}
                  onClick={handleSubmit}
                />
              </Flex>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NewCertification;
