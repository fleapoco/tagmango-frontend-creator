import { useEffect, useState } from "react";

import type { RadioChangeEvent } from "antd";
import { Col, Row, Tabs, Typography } from "antd";
import { useRouter } from "next/navigation";

import style from "../../style/task.module.scss";

import { initialDataAnalyticsState } from "@/empty-state-objects/empty";
import useAPI from "@/hooks/useApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getDataAnalyticsStored,
  setDataAnalytics,
} from "@/redux/reducers/analytics.reducer";
import { setUpdateDataAnalytic } from "@/redux/reducers/update-analytic.reducer";
import { DataAnalyticsTypes } from "@/types";
import { PrimaryButton } from "../../components/common/button";
import { AddIcon } from "../../components/common/icons";
import PageTitle from "../../components/pagetitle";
import { BusinessData } from "./businessdata";
import { BusinessStatistics } from "./businessstatistics";

const { TabPane } = Tabs;

const { Title } = Typography;

export const Data = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  const storedAnalytics = useAppSelector(getDataAnalyticsStored);
  const { getDataAnalytics, deleteAnalytic } = useAPI();
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const _getAnalytics = async () => {
    try {
      const dataAnalytics = await getDataAnalytics();
      dispatch(setDataAnalytics(dataAnalytics));
    } catch (error) {}
  };

  useEffect(() => {
    _getAnalytics();
  }, []);

  const handleButtonClick = () => {
    dispatch(setUpdateDataAnalytic(initialDataAnalyticsState));
    router.push("/data/add-data");
  };

  const handleDeleteAnalytics = async (id: string) => {
    try {
      await deleteAnalytic(id);
      _getAnalytics();
    } catch (error) {}
  };

  const handleUpdateAnalyticButton = (record: DataAnalyticsTypes) => {
    router.push("/data/add-data?type=update");
    dispatch(setUpdateDataAnalytic(record));
  };

  return (
    <>
      <div className={`${style["task-page"]} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center" }}
          className="p-15"
        >
          <Col span={12}>
            <PageTitle title="Data" />
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            <PrimaryButton
              text="Add Data"
              icon={<AddIcon />}
              variant="secondary"
              onClick={handleButtonClick}
            />
          </Col>
        </Row>

        {/* Calendar And My Task Tab Changing */}

        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={() => onChange}>
              <TabPane tab="Business Data" key="1">
                <BusinessData
                  data={storedAnalytics || []}
                  handleDelete={(id) => handleDeleteAnalytics(id)}
                  handlePagination={function (
                    page: number,
                    pageSize: number
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                  CountData={0}
                  dataPerPage={0}
                  currentPage={0}
                  handleUpdate={(record) => handleUpdateAnalyticButton(record)}
                />
              </TabPane>
              <TabPane tab="Business Statistics" key="2">
                <BusinessStatistics />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
