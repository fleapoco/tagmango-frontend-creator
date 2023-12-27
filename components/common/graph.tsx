import { ChartData } from "@/app/charity/page";
import { Col, DatePicker, Row, Typography } from "antd";
import Chart from "./Chart";
const { Title } = Typography;

const { RangePicker } = DatePicker;

export const DisplayGraph = (props: {
  chartData: ChartData;
  title: string;
}) => {
  return (
    <>
      <div className="border-box">
        <Row>
          <Col span={18}>
            <Title level={4} className="sub-title">
              {props.title}
            </Title>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <RangePicker />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              className="graph-wrapper"
              style={
                {
                  // position: "relative",
                  // height: "300px",
                  // textAlign: "center",
                }
              }
            >
              <div>
                Graph
                <div>
                  <Chart chartData={props.chartData} />
                </div>
              </div>

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
