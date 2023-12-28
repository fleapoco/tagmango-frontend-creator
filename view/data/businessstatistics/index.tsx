import { Col, Row } from "antd";

import { ChartData } from "@/app/charity/page";
import { Dayjs } from "dayjs";
import { DisplayGraph } from "../../../components/common/graph";

export const BusinessStatistics = (props: { chartData: ChartData }) => {
  return (
    <>
      <div className="p-15">
        <Row gutter={[0, 15]}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Col span={24} key={i}>
              <DisplayGraph
                chartData={props.chartData}
                title="Revenue Tracker"
                onDateChange={function (
                  dates: Dayjs,
                  dateStrings: [string, string]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
