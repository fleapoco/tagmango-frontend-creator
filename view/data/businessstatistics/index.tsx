import { Col, Row, Spin } from "antd";

import { GetAnalyticsGraphDataTypes } from "@/types";
import { Dayjs } from "dayjs";
import { DisplayGraph } from "../../../components/common/graph";

export const BusinessStatistics = (props: {
  chartData: GetAnalyticsGraphDataTypes;
  isLoading?: boolean;
}) => {
  const revenueEarned = props.chartData?.revenueEarnedGraph ?? {};
  const adSpends = props.chartData?.adSpendsGraph ?? {};
  const costPerLead = props.chartData?.costPerLeadGraph ?? {};
  const addSpendsReturn = props.chartData?.adSpendsReturnGraph ?? {};
  const vipGroupSize = props.chartData?.vipGroupSizeGraph ?? {};
  const totalPaidCustomers = props.chartData?.vipGroupSizeGraph ?? {};

  return (
    <>
      <Spin size="large" spinning={props.isLoading}>
        <div className="p-15">
          <Row gutter={[0, 15]}>
            <Col span={24}>
              <DisplayGraph
                chartData={{
                  series: revenueEarned.amount?.map((e) => Number(e)),
                  labels: revenueEarned.months,
                }}
                title="Revenue Earned"
                onDateChange={function (
                  dates: Dayjs,
                  dateStrings: [string, string]
                ): void {
                  throw new Error("Function not implemented.");
                }}
                type={"bar"}
              />
            </Col>
            <Col span={24}>
              <DisplayGraph
                type={"bar"}
                chartData={{
                  series: adSpends.amount?.map((e) => Number(e)),
                  labels: adSpends.months,
                }}
                title="Ad Spends"
                onDateChange={function (
                  dates: Dayjs,
                  dateStrings: [string, string]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
            <Col span={24}>
              <DisplayGraph
                type={"bar"}
                chartData={{
                  series: costPerLead.amount?.map((e) => Number(e)),
                  labels: costPerLead.months,
                }}
                title="Cost Per Lead"
                onDateChange={function (
                  dates: Dayjs,
                  dateStrings: [string, string]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
            <Col span={24}>
              <DisplayGraph
                type={"bar"}
                chartData={{
                  series: addSpendsReturn.amount?.map((e) => Number(e)),
                  labels: addSpendsReturn.months,
                }}
                title="Return On Ad Spends (ROAS)"
                onDateChange={function (
                  dates: Dayjs,
                  dateStrings: [string, string]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
            <Col span={24}>
              <DisplayGraph
                type={"bar"}
                chartData={{
                  series: vipGroupSize.amount?.map((e) => Number(e)),
                  labels: vipGroupSize.months,
                }}
                title="VIP Group Size"
                onDateChange={function (
                  dates: Dayjs,
                  dateStrings: [string, string]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
            <Col span={24}>
              <DisplayGraph
                type={"bar"}
                chartData={{
                  series: totalPaidCustomers.amount?.map((e) => Number(e)),
                  labels: totalPaidCustomers.months,
                }}
                title="
							Total Paid Customers (L1)"
                onDateChange={function (
                  dates: Dayjs,
                  dateStrings: [string, string]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
};
