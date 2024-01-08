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
import { DataAnalyticsTypes, GetAnalyticsGraphDataTypes } from "@/types";
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
  const [analyticGraphData, setAnalyticGraphData] =
    useState<GetAnalyticsGraphDataTypes | null>(null);

  const storedAnalytics = useAppSelector(getDataAnalyticsStored);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState<boolean>(false);
  const [isAnalyticsGraphLoading, setIsAnalyticsGraphLoading] =
    useState<boolean>(false);
  const { getDataAnalytics, deleteAnalytic, getAnalyticsGraphData } = useAPI();
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const fetchAnalyticsGraphData = async () => {
    setIsAnalyticsGraphLoading(true);
    try {
      const data = await getAnalyticsGraphData();
      setAnalyticGraphData(data);
    } catch (error) {
    } finally {
      setIsAnalyticsGraphLoading(false);
    }
  };

  // const chartData = {
  //   series: [30, 40, 45, 50, 49, 60, 70, 91, 125],
  //   labels: ["1", " 2", " 3", "4", "5", "6", "7", "8", "9"],
  // };

  const _getAnalytics = async () => {
    setIsAnalyticsLoading(true);
    try {
      const dataAnalytics = await getDataAnalytics();
      dispatch(setDataAnalytics(dataAnalytics));
    } catch (error) {
    } finally {
      setIsAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    _getAnalytics();
  }, []);

  useEffect(() => {
    fetchAnalyticsGraphData();
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
              variant="primary"
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
                  isLoading={isAnalyticsLoading}
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
                <BusinessStatistics
                  chartData={analyticGraphData!}
                  isLoading={isAnalyticsGraphLoading}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
