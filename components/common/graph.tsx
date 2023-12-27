import { ChartData } from "@/app/charity/page";
import { Col, DatePicker, Row, Typography } from "antd";
import dayjs from "dayjs";
import Chart from "./Chart";
const { Title } = Typography;

const { RangePicker } = DatePicker;

export const DisplayGraph = (props: {
  chartData: ChartData;
  title: string;
  onDateChange: (dates: dayjs.Dayjs, dateStrings: [string, string]) => void;
}) => {
  const handleDateChange = (
    dates: dayjs.Dayjs,
    dateStrings: [string, string]
  ) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
    props.onDateChange(dates, dateStrings);
  };
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
            <RangePicker picker="month" onChange={handleDateChange as any} />
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
