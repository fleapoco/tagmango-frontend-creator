'use client';

import { Col, Row } from 'antd';

import { CertificationCard } from '../../../components/common/certification';
import PageTitle from '../../../components/pagetitle';

const Certification = () => {
  return (
    <>
      {/* Page Title */}
      <Row style={{ padding: '15px 0' }}>
        <Col span={24}>
          <PageTitle title='Degree' />
        </Col>
      </Row>
      {/* Events Cards */}

      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Col span={8} key={i}>
            <CertificationCard />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Certification;
