import useAPI from "@/hooks/useApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { setDataAnalytics } from "@/redux/reducers/data-analytic.reducer";
import { DataAnalyticsTypes } from "@/types";
import { Col, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../components/form/input";

interface Props {
  analyticData: DataAnalyticsTypes;
  open: boolean;
  onCancel: () => void;
}

const UpdateDataAnalyticModal: React.FC<Props> = ({
  analyticData,
  open,
  onCancel,
}) => {
  const { updateDataAnalytic, getDataAnalytics } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [data, setData] = useState(analyticData);

  useEffect(() => {
    if (analyticData) setData(analyticData);
  }, [analyticData]);

  const handleUpdateAnalytic = async (record: DataAnalyticsTypes) => {
    try {
      setLoading(true);
      const res = await updateDataAnalytic(record.id, data);
      message.success("data updated successfully");
      onCancel();
      const dataAnalytics = await getDataAnalytics();
      dispatch(setDataAnalytics(dataAnalytics));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      confirmLoading={loading}
      onOk={() => handleUpdateAnalytic(analyticData)}
      okText={"save"}
      onCancel={onCancel}
    >
      <Col span={24}>
        <FormInput
          placeholder="Select Month"
          label="Month"
          type="month"
          value={data.month ?? ""}
          onDateChange={(date, dateString) => {
            console.log(dateString);
            setData({ ...data, month: dateString });
          }}
        />
      </Col>
      <Col span={24}>
        <FormInput
          placeholder=""
          label="Revenue Earned"
          icon={"₹"}
          value={data.revenueEarned}
          onChange={(e) =>
            setData({ ...data, revenueEarned: Number(e.target.value) })
          }
          type="number"
        />
      </Col>
      <Col span={24}>
        <FormInput
          label="Ad Spends"
          icon={"₹"}
          type="number"
          value={data.adSpends}
          onChange={(e) =>
            setData({ ...data, adSpends: Number(e.target.value) })
          }
        />
      </Col>
      <Col span={24}>
        <FormInput
          label="Average Cost Per Lead"
          icon={"₹"}
          value={data.costPerLead}
          onChange={(e) =>
            setData({ ...data, costPerLead: Number(e.target.value) })
          }
          type="number"
        />
      </Col>
      <Col span={24}>
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
      </Col>
      <Col span={24}>
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
      </Col>
      <Col span={24}>
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
      </Col>
      <Col span={24}>
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
      </Col>
    </Modal>
  );
};

export default UpdateDataAnalyticModal;
