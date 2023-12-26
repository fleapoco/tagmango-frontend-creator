import { CloseOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { PrimaryButton } from './common/button';
import { PrimaryCard } from './common/card';
import { CustomTag } from './common/tag';
const { Title } = Typography;

const MarkAsCompleteCard = () => {
  return (
    <div className='marks-as-complete-card'>
      <PrimaryCard
        extra={
          <>
            <Button type='text' shape='circle' size='small'>
              <CloseOutlined size={2} />
            </Button>
          </>
        }
      >
        <div className='content'>
          <Title level={5}>
            Learn - Podcast or course Podcast or course Podcast or css Podcast
            or course dsd
          </Title>
          <PrimaryButton
            text={
              <>
                Mark as complete &nbsp;
                <CustomTag variant='success' title='20XP' />
              </>
            }
            size='small'
            variant='secondary'
          />
        </div>
      </PrimaryCard>
    </div>
  );
};

export default MarkAsCompleteCard;
