import { ChartData } from "@/app/charity/page";
import { Col, DatePicker, Row, Typography } from "antd";
import dayjs from "dayjs";
import Chart from "./Chart";
const { Title } = Typography;

const { RangePicker } = DatePicker;

export const DisplayGraph = (props: {
  chartData: ChartData;
  title: string;
  type: "area" | "line" | "bar";
  onDateChange: (dates: dayjs.Dayjs, dateStrings: [string, string]) => void;
}) => {
  const handleDateChange = (
    dates: dayjs.Dayjs,
    dateStrings: [string, string]
  ) => {
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
            <div className="graph-wrapper">
              <div>
                <div>
                  <Chart chartData={props.chartData} type={props.type} />
                </div>
              </div>

              <div className="vertical-content">
                <Title level={5} className="vertical-text">
                  {props.title}
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
