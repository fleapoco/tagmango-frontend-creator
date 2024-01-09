import { UserAchievement, UserDegree } from '@/types';
import { Card, Typography } from 'antd';
import { PrimaryButton } from './button';

const { Meta } = Card;

const { Title } = Typography;
const { Paragraph } = Typography;
type CertificationCardObject = {
  degree?: UserDegree;
  achievement?: UserAchievement;
};

export const CertificationCard = ({
  degree,
  achievement,
}: CertificationCardObject) => {
  const handleApplyButtonClick = (link: string | undefined) => {
    if (!link) return;
    window.open(link, '_blank');
  };

  return (
    <>
      {degree && (
        <Card
          className='certification-card'
          cover={<img alt={degree?.title} src={degree?.thumbnailUrl} />}
        >
          <Meta
            title={degree?.title}
            description={
              <>
                <div className='events-card-description'>
                  <Paragraph
                    style={{ margin: '0 0 15px 0' }}
                    ellipsis={{
                      rows: 2,
                      expandable: true,
                      onEllipsis: (ellipsis) => {
                        console.log('Ellipsis changed:', ellipsis);
                      },
                    }}
                    title={`${degree?.description}`}
                  >
                    {degree?.description}
                  </Paragraph>
                </div>
                <PrimaryButton
                  text='Apply Now'
                  variant='primary'
                  onClick={() => handleApplyButtonClick(degree?.degreeLink)}
                />
              </>
            }
          />
        </Card>
      )}

      {achievement && (
        <Card
          className='certification-card'
          style={{ width: '100%' }}
          cover={
            <img alt={achievement?.title} src={achievement?.thumbnailUrl} />
          }
        >
          <Meta
            title={achievement?.title}
            description={
              <>
                <div className='events-card-description'>
                  <Paragraph
                    style={{ margin: '0 0 15px 0' }}
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
                <PrimaryButton
                  text='Apply Now'
                  variant='primary'
                  onClick={() =>
                    handleApplyButtonClick(achievement?.achievementLink)
                  }
                />
              </>
            }
          />
        </Card>
      )}
    </>
  );
};
