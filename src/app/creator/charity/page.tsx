"use client";
import { Col, DatePicker, Row, Tabs } from "antd";
import { useRouter } from "next/navigation";

import useAPI from "@/hooks/useApi";
import { CategoryType, CreatorCharitiesType } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../../components/common/button";
import { PrimaryCard } from "../../../../components/common/card";
import { DisplayGraph } from "../../../../components/common/graph";
import { AddIcon } from "../../../../components/common/icons";
import { UserName } from "../../../../components/common/username";
import PageTitle from "../../../../components/pagetitle";
import style from "../../../../style/task.module.scss";
import MyCharityTable from "./mycharity";
import UsersCharity from "./usercharity";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
export interface ChartData {
  series: number[];
  labels: string[];
}

interface MyCharityDataType {
  key: string;
  date: string;
  category: CategoryType | null;
  amount: number;
  organization: string;
}

interface UsersCharityDataType {
  key: string;
  date: React.ReactNode;
  user: React.ReactNode;
  category: string;
  amount: number;
  organization: string;
}

const CharityPage = () => {
  const router = useRouter();
  const {
    getCreatorMyCharities,
    getCreatorUsersCharities,
    getCharitiesGraphData,
  } = useAPI();
  const [myCharitiesStartDate, setMyCharitiesStartDate] = useState("");
  const [myCharitiesEndDate, setMyCharitiesEndDate] = useState("");
  const [usersCharitiesStartDate, setUsersCharitiesStartDate] = useState("");
  const [usersCharitiesEndDate, setUsersCharitiesEndDate] = useState("");
  const [myCharityTotalAmount, setMyCharityTotalAmount] = useState<number>(0);
  const [usersCharityTotalAmount, setUsersCharityTotalAmount] =
    useState<number>(0);
  const [myCharitiesData, setMyCharitiesData] = useState<MyCharityDataType[]>(
    []
  );
  const [usersCharitiesData, setUsersCharitiesData] = useState<
    UsersCharityDataType[]
  >([]);
  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    labels: [],
  });
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);

  useEffect(() => {
    fetchMyCharities();
    fetchUsersCharities();
  }, [
    myCharitiesStartDate,
    myCharitiesEndDate,
    usersCharitiesStartDate,
    usersCharitiesEndDate,
  ]);

  useEffect(() => {
    graphData();
  }, [dateRange]);

  const graphData = async () => {
    try {
      const data = await getCharitiesGraphData({
        startMonth: dateRange.at(0),
        endMonth: dateRange.at(1),
      });
      // console.log(data);
      setChartData({
        series: data.amount.map((e) => Number(e)),
        labels: data.months,
      });
    } catch (error) {}
  };

  const fetchMyCharities = async () => {
    try {
      const data = await getCreatorMyCharities({
        startDate: myCharitiesStartDate,
        endDate: myCharitiesEndDate,
      });
      if (data && Array.isArray(data)) {
        const totalAmount: number = data.reduce(
          (accumulator, currentCharity) => accumulator + currentCharity.amount,
          0
        );
        setMyCharityTotalAmount(totalAmount);
        setMyCharitiesData(transformMyCharityData(data));
      }
    } catch (error) {}
  };

  const transformMyCharityData = (
    data: CreatorCharitiesType[]
  ): MyCharityDataType[] => {
    return data.map((item) => ({
      key: item.id,
      date: item.date,
      category: item.category,
      amount: item.amount,
      organization: item.organizationName,
    }));
  };

  // Function to format the date in "MM/DD/YYYY" string format
  const formatDate = (inputDate: string | Date): string => {
    const date = new Date(inputDate);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  };

  const fetchUsersCharities = async () => {
    try {
      const data = await getCreatorUsersCharities({
        startDate: usersCharitiesStartDate,
        endDate: usersCharitiesEndDate,
      });
      if (data && Array.isArray(data)) {
        const totalAmount: number = data.reduce(
          (accumulator, currentCharity) => accumulator + currentCharity.amount,
          0
        );
        setUsersCharityTotalAmount(totalAmount);
        setUsersCharitiesData(transformUserCharityData(data));
      }
    } catch (error) {}
  };

  const transformUserCharityData = (
    data: CreatorCharitiesType[]
  ): UsersCharityDataType[] => {
    return data.map((item) => ({
      key: item.id,
      date: formatDate(item.date),
      user: (
        <>
          <UserName username={item.userName ? item.userName : ""} />
        </>
      ),
      category: item.category ? item.category.title : "",
      amount: item.amount,
      organization: item.organizationName,
    }));
  };

  const handleDateChangeCallback = (
    dates: dayjs.Dayjs,
    dateStrings: [string, string]
  ) => {
    // console.log({ dateStrings });
    // Perform actions with selected dates, e.g., update state or make API calls
    setDateRange(dateStrings);
  };

  const handleButtonClick = () => {
    router.push("/creator/charity/addcharity");
  };

  return (
    <>
      <div className={`${style["charity-page"]} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center" }}
          className="p-15"
        >
          <Col span={12}>
            <PageTitle title="Charity" />
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
        {/* Task Total Count Section */}
        <div className="gray-box task-count-wrapper p-15">
          <Row gutter={[12, 0]} className=" ">
            {[
              {
                taskName: "Overall Charity",
                count: myCharityTotalAmount + usersCharityTotalAmount,
              },
            ].map((ele, i) => (
              <Col key={i} span={6} className="count-card">
                <PrimaryCard title={ele.taskName}>
                  <span style={{ margin: 0 }}>
                    ₹{ele.count.toLocaleString("en-IN")}
                  </span>
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        </div>

        <div className="p-15">
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <DisplayGraph
                chartData={chartData}
                title="Charity Tracker"
                onDateChange={(
                  dates: dayjs.Dayjs,
                  dateStrings: [string, string]
                ) => handleDateChangeCallback(dates, dateStrings)}
                type={"area"}
              />
            </Col>
          </Row>
        </div>

        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="My Charity" key="1">
                {/* Upcoming Events */}

                <MyCharityTable
                  data={myCharitiesData}
                  fetchMyCharities={fetchMyCharities}
                />
              </TabPane>
              <TabPane tab={`${"User"}'s Charity`} key="2">
                <UsersCharity data={usersCharitiesData} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CharityPage;
