import { Card } from 'antd';
import { PrimaryButton } from './button';
const { Meta } = Card;

import { Typography } from 'antd';

const { Title } = Typography;

export const CertificationCard = () => {
  return (
    <>
      <Card
        className='certification-card'
        style={{ width: '100%' }}
        cover={
          <img
            alt='example'
            src='https://images.unsplash.com/photo-1610878180933-123728745d22?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
        }
      >
        <Meta
          title='Title Certification'
          description={
            <div className='events-card-description'>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                quos aliquid maxime id ex cupiditate est assumenda atque
                mollitia blanditiis.
              </p>
              <PrimaryButton text='Apply Now' variant='primary' />
            </div>
          }
        />
      </Card>
    </>
  );
};
