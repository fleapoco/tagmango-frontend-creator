import { Col, Row } from 'antd';

import { DisplayGraph } from '../../../components/common/graph';

export const BusinessStatistics = () => {
  return (
    <>
      <div className='p-15'>
        <Row gutter={[0, 15]}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Col span={24} key={i}>
              <DisplayGraph />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
