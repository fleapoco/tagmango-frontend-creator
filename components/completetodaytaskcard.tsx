import { Checkbox, Flex, Space, Typography } from 'antd';
import { MdOutlineWatchLater } from 'react-icons/md';
import { PrimaryCard } from './common/card';
import { CustomTag } from './common/tag';

const { Title } = Typography;

const CompleteTodayTasks = () => {
  return (
    <div className='complete-today-task-card'>
      <PrimaryCard>
        <Space
          style={{
            width: '100%',
            alignItems: 'start',
            justifyContent: 'space-between',
          }}
        >
          <Space className='strike-check-box'>
            <Checkbox>Title Testing </Checkbox>
          </Space>
          <span className='mock-block custom-tag-wrapper'>
            <CustomTag
              color='default'
              title={
                <>
                  <Flex align='center' gap={3}>
                    <MdOutlineWatchLater /> <span>20:22 PM</span>
                  </Flex>
                </>
              }
            />
          </span>
        </Space>
      </PrimaryCard>
    </div>
  );
};

export default CompleteTodayTasks;
