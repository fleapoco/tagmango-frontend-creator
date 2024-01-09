'use client';

import { Col, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import style from '../../../../style/task.module.scss';

import { PrimaryButton } from '../../../../components/common/button';
import { AddIcon } from '../../../../components/common/icons';
import PageTitle from '../../../../components/pagetitle';

import { Card } from 'antd';

const { Meta } = Card;

import useAPI from '@/hooks/useApi';
import { UserAchievement } from '@/types';

import Loading from '@/app/loading';
import { useEffect, useState } from 'react';
import { ActionButton } from '../../../../components/common/actionbutton';

const { Paragraph } = Typography;

const CreatorCertification = () => {
  const router = useRouter();
  const { getCreatorAchievements } = useAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creatorAchievements, setCreatorAchievements] = useState<
    UserAchievement[]
  >([]);

  useEffect(() => {
    fetchCreatorAchievements();
  }, []);

  const fetchCreatorAchievements = async () => {
    setIsLoading(true);
    try {
      const achievementsData = await getCreatorAchievements();
      if (achievementsData && Array.isArray(achievementsData))
        setCreatorAchievements(achievementsData);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    router.push('/creator/achievement/newcertification');
  };
  return (
    <>
      {isLoading ? (
        <Loading pageloader={true} loading={isLoading} />
      ) : (
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
                          <ActionButton
                            actionFor='achievement'
                            id={achievement?.id}
                            fetchCreatorAchievements={fetchCreatorAchievements}
                          />
                        </div>
                      </>
                    }
                  >
                    <Meta
                      title={achievement?.title}
                      description={
                        <div className='events-card-description'>
                          <Paragraph
                            style={{ margin: 0 }}
                            ellipsis={{
                              rows: 2,
                              expandable: true,
                              onEllipsis: (ellipsis) => {
                                console.log('Ellipsis changed:', ellipsis);
                              },
                            }}
                            title={`${achievement?.description}`}
                          >
                            {achievement?.description}
                          </Paragraph>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </>
  );
};
export default CreatorCertification;
