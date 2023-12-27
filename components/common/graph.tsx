import { Col, DatePicker, Row, Typography } from 'antd';
const { Title } = Typography;

const { RangePicker } = DatePicker;

export const DisplayGraph = () => {
  return (
    <>
      <div className='border-box'>
        <Row>
          <Col span={18}>
            <Title level={4} className='sub-title'>
              Revenue Earned
            </Title>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <RangePicker />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              className='graph-wrapper'
              style={{
                position: 'relative',
                height: '300px',
                textAlign: 'center',
              }}
            >
              Graph
              <div className='vertical-content'>
                <Title level={5} className='vertical-text'>
                  Revenue
                </Title>
              </div>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: 'center' }}>
          <h4>Time</h4>
        </div>
      </div>
    </>
  );
};
