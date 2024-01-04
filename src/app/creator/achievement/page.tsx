'use client';

import { Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import style from '../../../../style/task.module.scss';

import { PrimaryButton } from '../../../../components/common/button';
import { AddIcon } from '../../../../components/common/icons';
import PageTitle from '../../../../components/pagetitle';

import { Card } from 'antd';

const { Meta } = Card;

import useAPI from '@/hooks/useApi';
import { UserAchievement } from '@/types';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ActionButton } from '../../../../components/common/actionbutton';
const { Title } = Typography;

const CreatorCertification = () => {
  const router = useRouter();
  const { getCreatorAchievements } = useAPI();
  const [creatorAchievements, setCreatorAchievements] = useState<
    UserAchievement[]
  >([]);

  useEffect(() => {
    fetchCreatorAchievements();
  }, []);

  const fetchCreatorAchievements = async () => {
    try {
      const achievementsData = await getCreatorAchievements();
      if (achievementsData && Array.isArray(achievementsData))
        setCreatorAchievements(achievementsData);
    } catch (error) {}
  };

  const handleButtonClick = () => {
    router.push('/creator/achievement/newcertification');
  };
  return (
    <>
      <div className={`${style['task-page']}`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center', padding: '15px 0' }}
        >
          <Col span={12}>
            <PageTitle title='Achievement' />
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryButton
              text='New Achievement'
              icon={<AddIcon />}
              onClick={handleButtonClick}
              variant='primary'
            />
          </Col>
        </Row>
        {/* Events Cards */}
        <Row
          gutter={[16, 16]}
          style={{ flexWrap: 'wrap', alignItems: 'stretch' }}
        >
          {creatorAchievements &&
            creatorAchievements.map((achievement: UserAchievement) => (
              <Col md={12} lg={8} xl={6} key={achievement?.id}>
                <Card
                  className='certification-card'
                  style={{ width: '100%' }}
                  cover={
                    <>
                      <img
                        alt={achievement?.title}
                        src={achievement?.thumbnailUrl}
                      />
                      <div className='cover-over-img'>
                        <ActionButton />
                      </div>
                    </>
                  }
                >
                  <Meta
                    title={achievement?.title}
                    description={
                      <div className='events-card-description'>
                        <p style={{ marginBottom: 0 }}>
                          {achievement?.description}
                        </p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};
export default CreatorCertification;
