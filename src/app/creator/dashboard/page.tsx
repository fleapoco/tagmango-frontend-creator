'use client';

import { Col, Row } from 'antd';
import PageTitle from '../../../../components/pagetitle';
import style from '../../../../style/creator.module.scss';
import { DashboardBadges } from './badges';
import { DashboardMembers } from './members';

const CreatorDashboard = () => {
  return (
    <>
      <div className={`${style['creator-dashboard-page']}`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center', padding: '15px 0' }}
        >
          <Col span={12}>
            <PageTitle title='Dashboard' />
          </Col>
        </Row>
        <Row gutter={[0, 15]}>
          <Col span={24}>
            <div
              className='border-box'
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <DashboardBadges />
            </div>
          </Col>
          <Col span={24}>
            <div
              className='border-box'
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <DashboardMembers />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreatorDashboard;
