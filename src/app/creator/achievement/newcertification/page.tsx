'use client';

import Loading from '@/app/loading';
import useAPI from '@/hooks/useApi';
import { APIError, UserAchievement } from '@/types';
import { Col, Flex, Row } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
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
  achievementLink?: string;
  description: string;
  thumbnailUrl: string;
};

const NewCertification = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createAchievement, getCreatorAchievementById, updateAchievement } =
    useAPI();
  const params = useSearchParams();
  const achievementId = params.get('id');

  const [achievementDataType, setAchievementDataType] =
    useState<AchievementDataType>({
      title: '',
      achievementLink: '',
      description: '',
      thumbnailUrl: '',
    });

  useEffect(() => {
    if (achievementId) {
      fetchAchievementById(achievementId);
    }
  }, [achievementId]);

  const isValidFormData = (achievementData: AchievementDataType) => {
    if (
      !achievementData.title ||
      !achievementData.description ||
      !achievementData.thumbnailUrl
    )
      return false;
    return true;
  };

  const fetchAchievementById = async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      let data: APIError | UserAchievement = await getCreatorAchievementById(
        id
      );

      if ('title' in data && 'description' in data && 'thumbnailUrl' in data) {
        setAchievementDataType({
          title: data.title,
          achievementLink: data.achievementLink,
          description: data.description,
          thumbnailUrl: data.thumbnailUrl,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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
    else if (e.target.name === 'achievementLink')
      setAchievementDataType((prev) => {
        return { ...prev, achievementLink: e.target.value };
      });
    else if (e.target.name === 'description')
      setAchievementDataType((prev) => {
        return { ...prev, description: e.target.value };
      });
  };

  const updateAchievementAction = async () => {
    try {
      let data: APIError | UserAchievement = await updateAchievement(
        achievementDataType,
        achievementId
      );

      if ('statusCode' in data) {
        alert(data?.message);
        return;
      }

      router.push('/creator/achievement');
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!isValidFormData) alert('Invalid/Missing Input Data');

    try {
      if (achievementId) {
        await updateAchievementAction();
        return;
      }

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
      {isLoading ? (
        <Loading pageloader={true} loading={isLoading} />
      ) : (
        <div className={`${style['creator-task-details-form']} `}>
          {/* Page Title */}
          <Row style={{ padding: '15px 0' }}>
            <Col span={24}>
              <BreadCrumbNav item={breadCrumbItems} />
              <PageTitle
                title={achievementId ? 'Edit Achievement' : 'New Achievement'}
              />
            </Col>
          </Row>
          <Row gutter={[12, 0]}>
            <Col span={12}>
              <div className='border-box p-15'>
                <ImageUpload
                  handleUpload={handleUpload}
                  existImageUrl={
                    achievementId ? achievementDataType.thumbnailUrl : ''
                  }
                />
                <FormInput
                  label='Achievement Title'
                  placeholder='Add Title'
                  onChange={handleOnChange}
                  name='title'
                  value={achievementDataType.title}
                />
                <FormInput
                  label='Achievement Link'
                  type='link'
                  onChange={handleOnChange}
                  placeholder='Add Achievement Link'
                  name='achievementLink'
                  value={achievementDataType.achievementLink}
                />
                <div className='form-group'>
                  <label htmlFor='requirement'>Requirement</label>
                  <FormTextArea
                    placeholder='Description'
                    onChange={handleOnChange}
                    name='description'
                    value={achievementDataType.description}
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
      )}
    </>
  );
};

export default NewCertification;
