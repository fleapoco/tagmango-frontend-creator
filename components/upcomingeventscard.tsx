import { Flex, Typography } from 'antd';
import { PrimaryCard } from './common/card';
import { CustomTag } from './common/tag';

import { PrimaryButton } from './common/button';

const { Title } = Typography;

const UpcomingEventsCard = () => {
  return (
    <div className='marks-as-complete-card upcoming-cards-wrapper'>
      <PrimaryCard
        extra={
          <>
            <PrimaryButton variant='info' />
          </>
        }
      >
        <div className='content'>
          <CustomTag
            color='default'
            title={
              <>
                <Flex align='center' gap={3}>
                  <span>Today, 20:22 PM - 10PM</span>
                </Flex>
              </>
            }
          />
          <Title level={5}>
            Learn - Podcast or course Podcast or course Podcast or css Podcast
            or course dsd
          </Title>
          <PrimaryButton text='Join' size='small' variant='primary' />
        </div>
      </PrimaryCard>
    </div>
  );
};

export default UpcomingEventsCard;
