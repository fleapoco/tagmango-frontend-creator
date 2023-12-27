import { Col, Row, Typography } from 'antd';
import {
  MdControlPoint,
  MdCurrencyRupee,
  MdGroups,
  MdNewspaper,
  MdOutlineAnalytics,
  MdOutlineLeaderboard,
} from 'react-icons/md';
import { PrimaryCard } from '../../components/common/card';
import CompleteTodayTasks from '../../components/completetodaytaskcard';
import MarkAsCompleteCard from '../../components/markascompletecard';
import PageTitle from '../../components/pagetitle';
import UpcomingEventsCard from '../../components/upcomingeventscard';
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
                icon: <MdControlPoint size={26} color='rgba(0, 0, 0, 0.45)' />,
                taskName: 'My Points',
                count: 2,
              },
              {
                icon: <MdCurrencyRupee size={26} color='rgba(0, 0, 0, 0.45)' />,
                taskName: 'My Earnings',
                count: `₹ ${8}`,
              },
              {
                icon: <MdNewspaper size={26} color='rgba(0, 0, 0, 0.45)' />,
                taskName: 'My Attendance',
                count: 6,
              },
              {
                icon: (
                  <MdOutlineAnalytics size={26} color='rgba(0, 0, 0, 0.45)' />
                ),
                taskName: 'Productivity',
                count: 6,
              },
              {
                icon: (
                  <MdOutlineLeaderboard size={26} color='rgba(0, 0, 0, 0.45)' />
                ),
                taskName: 'My Leads',
                count: 6,
              },
              {
                icon: <MdGroups size={26} color='rgba(0, 0, 0, 0.45)' />,
                taskName: 'My Customers',
                count: 6,
              },
              {
                icon: <MdControlPoint size={26} color='rgba(0, 0, 0, 0.45)' />,
                taskName: 'My Charity',
                count: 6,
              },
              {
                icon: <MdControlPoint size={26} color='rgba(0, 0, 0, 0.45)' />,
                taskName: 'Overall Charity',
                count: 6,
              },
            ].map((ele, i) => (
              <Col key={i} span={6} className='count-card'>
                <PrimaryCard title={ele.taskName}>
                  <span style={{ margin: 0 }}>{ele.count}</span>
                  <div className='over-icon'>{ele.icon}</div>
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        </div>
        <Row className='cards-wrapper p-15' gutter={[15, 0]}>
          <Col span={8}>
            <div className='border-box habit-cards'>
              <Title level={5}>Complete today's Habits</Title>
              <Row gutter={[0, 12]}>
                {[1, 2, 3, 4].map((i) => (
                  <Col span={24} key={i}>
                    <MarkAsCompleteCard />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <div className='complete-you-tasks-cards border-box tasks-card'>
              <Row>
                <Title level={5}>Complete today's Tasks</Title>

                <Row gutter={[0, 12]} style={{ width: '100%' }}>
                  <Col span={24}>
                    <CompleteTodayTasks />
                  </Col>
                </Row>
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <div className='border-box'>
              <Title level={5}>Upcoming Events</Title>

              <Row gutter={[0, 12]} style={{ width: '100%' }}>
                <Col span={24}>
                  <UpcomingEventsCard />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
