import { Flex, Typography } from 'antd';
import { PrimaryCard } from './common/card';
import { CustomTag } from './common/tag';

import { ActionButton } from './common/actionbutton';
import { PrimaryButton } from './common/button';

const { Title } = Typography;

const UpcomingEventsCard = () => {
  return (
    <div className='marks-as-complete-card upcoming-cards-wrapper'>
      <PrimaryCard
        extra={
          <>
            <ActionButton horizontal={false} />
          </>
        }
      >
        <div className='content'>
          <CustomTag
            color='default'
            title={
              <>
                <Flex align='center' gap={3}>
                  <span style={{ color: 'rgba(0,0,0,.85)' }}>
                    Today, 20:22 PM - 10PM
                  </span>
                </Flex>
              </>
            }
          />
          <Title level={5}>
            Learn - Podcast or course Podcast or course Podcast or css Podcast
            or course dsd
          </Title>
          <PrimaryButton text='Join' variant='primary' />
        </div>
      </PrimaryCard>
    </div>
  );
};

export default UpcomingEventsCard;
