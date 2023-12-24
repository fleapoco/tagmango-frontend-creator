import { FormInputType } from "@/types";
import { Col, Row, Typography } from "antd";
import { FormInput } from "../form/input";
const { Title } = Typography;

export const DisplayGraph = () => {
  return (
    <>
      <div
        style={{
          background: "#fff",
          padding: "15px",
        }}
      >
        <Row>
          <Col span={16}>
            <Title level={4} className="sub-title">
              Revenue Earned
            </Title>
          </Col>
          <Col span={8}>
            <FormInput type={FormInputType.DATE} placeholder="Select Date" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              className="graph-wrapper"
              style={{
                position: "relative",
                height: "300px",
                textAlign: "center",
              }}
            >
              Graph
              <div className="vertical-content">
                <Title level={5} className="vertical-text">
                  Revenue
                </Title>
              </div>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <h4>Time</h4>
        </div>
      </div>
    </>
  );
};
