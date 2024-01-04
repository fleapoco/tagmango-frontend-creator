'use client';
import { Col, DatePicker, Row, Tabs } from 'antd';
import { useRouter } from 'next/navigation';

import { PrimaryButton } from '../../../../components/common/button';
import { PrimaryCard } from '../../../../components/common/card';
import { AddIcon } from '../../../../components/common/icons';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/task.module.scss';
import MyCharityTable from './mycharity';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
export interface ChartData {
  series: number[];
  labels: string[];
}

const CharityPage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/creator/charity/addcharity');
  };

  return (
    <>
      <div className={`${style['charity-page']} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center' }}
          className='p-15'
        >
          <Col span={12}>
            <PageTitle title='Charity' />
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryButton
              text='Add Data'
              icon={<AddIcon />}
              variant='primary'
              onClick={handleButtonClick}
            />
          </Col>
        </Row>
        {/* Task Total Count Section */}
        <div className='gray-box task-count-wrapper p-15'>
          <Row gutter={[12, 0]} className=' '>
            {[
              {
                taskName: 'Overall Charity',
                count: 25000,
              },
            ].map((ele, i) => (
              <Col key={i} span={6} className='count-card'>
                <PrimaryCard title={ele.taskName}>
                  <span style={{ margin: 0 }}>
                    ₹{ele.count.toLocaleString('en-IN')}
                  </span>
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        </div>

        <div className='p-r-b-l-15'>
          <Row gutter={[0, 12]}>
            <Col span={24}>Graph</Col>
          </Row>
        </div>

        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='My Charity' key='1'>
                {/* Upcoming Events */}

                <MyCharityTable />
              </TabPane>
              <TabPane tab={`${'User'}'s Charity`} key='2'>
                <div className='previous-wrapper'>2</div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CharityPage;
