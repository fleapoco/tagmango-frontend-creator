import { initialDataAnalyticsState } from "@/empty-state-objects/empty";
import useApi from "@/hooks/useApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import { getUpdateDataAnalyticState } from "@/redux/reducers/update-analytic.reducer";
import { DataAnalyticsTypes } from "@/types";
import { Col, Flex, Row, message } from "antd";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BreadCrumbNav } from "../../components/common/breadcrumb";
import { PrimaryButton } from "../../components/common/button";
import { FormInput } from "../../components/form/input";
import PageTitle from "../../components/pagetitle";

export const AddData = () => {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { createAnalytics, updateDataAnalytic } = useApi();
  const dataAnalytic = useAppSelector(getUpdateDataAnalyticState);
  const [data, setData] = useState<DataAnalyticsTypes>(
    initialDataAnalyticsState
  );

  const type = params.get("type");

  const isButtonDisabled = Object.values(data)
    .filter((key) => key !== "month")
    .some((value) => value === undefined || value === 0 || value === "");

  const handleSaveData = async () => {
    try {
      setLoading(true);
      if (type && type === "update") {
        await updateDataAnalytic(dataAnalytic.id!, data);
        message.success("data updated successfully");
      } else {
        await createAnalytics({
          ...data,
          month: data.month ?? dayjs().toISOString(),
        });
        setData(initialDataAnalyticsState);
      }
      router.push("/data");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const breadCrumbItems = [
    {
      title: "Back to Data",
      link: "/productivity/task",
    },
  ];

  useEffect(() => {
    setData(dataAnalytic);
  }, [type]);

  console.log(data);

  return (
    <>
      <Row style={{ paddingTop: "16px" }}>
        <Col span={16} className="border-box">
          <BreadCrumbNav item={breadCrumbItems} />

          {/* Page Title */}
          <Row justify={"space-between"} style={{ alignItems: "center" }}>
            <Col span={24}>
              <PageTitle
                title={type === "update" ? "Update Data" : "Add Data"}
              />
            </Col>
          </Row>

          <div style={{ paddingTop: "15px" }}>
            <FormInput
              placeholder="Select Month"
              label="Month"
              type="month"
              value={data.month ?? undefined}
              onDateChange={(date, dateString) =>
                setData({ ...data, month: dateString })
              }
            />

            <FormInput
              placeholder=""
              label="Revenue Earned"
              icon={"₹"}
              value={data.revenueEarned}
              onChange={(e) =>
                setData({
                  ...data,
                  revenueEarned: Number(e.target.value),
                })
              }
              type="number"
            />

            <FormInput
              label="Ad Spends"
              icon={"₹"}
              type="number"
              value={data.adSpends}
              onChange={(e) =>
                setData({ ...data, adSpends: Number(e.target.value) })
              }
            />

            <FormInput
              label="Average Cost Per Lead"
              icon={"₹"}
              value={data.costPerLead}
              onChange={(e) =>
                setData({ ...data, costPerLead: Number(e.target.value) })
              }
              type="number"
            />

            <FormInput
              label="Total Leads Generated"
              value={data.totalLeadsGenerated}
              onChange={(e) =>
                setData({
                  ...data,
                  totalLeadsGenerated: Number(e.target.value),
                })
              }
            />

            <FormInput
              label="Total Paid Customers"
              value={data.totalPaidCustomers}
              onChange={(e) =>
                setData({
                  ...data,
                  totalPaidCustomers: Number(e.target.value),
                })
              }
            />
            <FormInput
              label="Total Group Size"
              type="number"
              value={data.vipGroupSize}
              onChange={(e) =>
                setData({
                  ...data,
                  vipGroupSize: Number(e.target.value),
                })
              }
            />
            <FormInput
              value={data.adSpendsReturn}
              label="ROAS"
              onChange={(e) =>
                setData({
                  ...data,
                  adSpendsReturn: Number(e.target.value),
                })
              }
            />
            <Flex gap="middle" justify="end">
              <PrimaryButton variant="secondary" text="Cancel" />
              <PrimaryButton
                loading={loading}
                disabled={isButtonDisabled}
                variant="primary"
                text="Save"
                onClick={handleSaveData}
              />
            </Flex>
          </div>
        </Col>
      </Row>
    </>
  );
};
