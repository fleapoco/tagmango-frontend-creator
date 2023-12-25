import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Row, Space, Typography } from 'antd';
import { PrimaryButton } from '../../components/common/button';
import { PrimaryCard } from '../../components/common/card';
import { CustomTag } from '../../components/common/tag';
import PageTitle from '../../components/pagetitle';
import style from '../../style/task.module.scss';

const { Title } = Typography;

export const Dashboard = () => {
  return (
    <>
      <div className={`${style['dashboard-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={12}>
            <PageTitle title='Dashboard' />
          </Col>
        </Row>
        {/* Task Total Count Section */}
        <div className='gray-box task-count-wrapper p-15'>
          <Row gutter={[15, 15]} className=' '>
            {[
              {
                taskName: 'My Points',
                count: 2,
              },
              {
                taskName: 'My Earnings',
                count: 6,
              },
              {
                taskName: 'My Attendance',
                count: 6,
              },
              {
                taskName: 'Productivity',
                count: 6,
              },
              {
                taskName: 'My Leads',
                count: 6,
              },
              {
                taskName: 'My Customers',
                count: 6,
              },
              {
                taskName: 'My Charity',
                count: 6,
              },
              {
                taskName: 'Overall Charity',
                count: 6,
              },
            ].map((ele, i) => (
              <Col key={i} span={6} className='count-card'>
                <PrimaryCard title={ele.taskName}>
                  <span style={{ margin: 0 }}>{ele.count}</span>
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        </div>
        <Row className='p-15' gutter={[15, 0]}>
          <Col span={8}>
            <div className='border-box habit-cards '>
              <Title level={5} className='sub-title' style={{ marginTop: '0' }}>
                Complete today's Habits
              </Title>
              <Row gutter={[0, 12]}>
                {[1, 2, 3, 4].map((i) => (
                  <Col span={24} key={i}>
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
                        <CustomTag variant='success' title='20XP' />
                        <Title level={5}>Learn - Podcast or course</Title>
                        <PrimaryButton
                          text='Mark as complete '
                          size='small'
                          variant='secondary'
                        />
                      </div>
                    </PrimaryCard>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <div className='complete-you-tasks-cards border-box tasks-card'>
              <Row>
                <Title
                  level={5}
                  className='sub-title'
                  style={{ marginTop: '0' }}
                >
                  Complete today's Tasks
                </Title>

                <Row gutter={[0, 12]} style={{ width: '100%' }}>
                  <Col span={24}>
                    <PrimaryCard>
                      <Space
                        style={{
                          width: '100%',
                          alignItems: 'start',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Space className='strike-check-box'>
                          <Checkbox>Testing Title</Checkbox>
                        </Space>
                        <span className='mock-block'>
                          <CustomTag variant='gray' title='02:10PM' />
                        </span>
                      </Space>
                    </PrimaryCard>
                  </Col>
                </Row>
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <div className='border-box'>
              <Title level={5} className='sub-title' style={{ marginTop: '0' }}>
                Upcoming Events
              </Title>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
