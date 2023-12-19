import { useEffect, useState } from "react";

import type { RadioChangeEvent } from "antd";
import { Col, Row, Tabs, Typography } from "antd";
import { useRouter } from "next/navigation";
import style from "../../style/task.module.scss";

import useAPI from "@/hooks/useApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getDataAnalyticsStored,
  setDataAnalytics,
} from "@/redux/reducers/data-analytic.reducer";
import { PrimaryButton } from "../../components/common/button";
import PageTitle from "../../components/pagetitle";
import { BusinessData } from "./businessdata";
import { BusinessStatistics } from "./businessstatistics";

const { TabPane } = Tabs;

const { Title } = Typography;

export const Data = () => {
  const dispatch = useAppDispatch();
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

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/data/adddata");
  };

  const handleDeleteAnalytics = async (id: string) => {
    try {
      await deleteAnalytic(id);
      _getAnalytics();
    } catch (error) {}
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
              variant="dark"
              onClick={handleButtonClick}
            />
          </Col>
        </Row>

        {/* Calendar And My Task Tab Changing */}
        <div className="gray-box p-15">
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={() => onChange}>
                <TabPane tab="Business Statistics" key="1">
                  <BusinessStatistics />
                </TabPane>
                <TabPane tab="Business Data" key="2">
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
                  />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
