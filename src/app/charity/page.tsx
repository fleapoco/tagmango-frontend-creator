"use client";
import useAPI from "@/hooks/useApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { setCharity } from "@/redux/reducers/charity.reducer";
import { CharitiesType } from "@/types";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../components/common/button";
import { DisplayGraph } from "../../../components/common/graph";
import { AddIcon } from "../../../components/common/icons";
import { FormInput } from "../../../components/form/input";
import PageTitle from "../../../components/pagetitle";
import style from "../../../style/task.module.scss";
import { Charity } from "../../../view/charity";

export interface ChartData {
  series: number[];
  labels: string[];
}

const CharityPage = () => {
  const dispatch = useAppDispatch();
  const { getCharities, deleteCharity, getCharitiesGraphData } = useAPI();
  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    labels: [],
  });
  const [charities, setCharities] = useState<CharitiesType[]>([]);
  // const [charity, setCharity] = useState<CharitiesType>(initialCharitiesState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [filterDate, setFilterDate] = useState<string>("");

  const graphData = async () => {
    try {
      const data = await getCharitiesGraphData();
      console.log(data);
      setChartData({
        series: data.amount.map((e) => Number(e)),
        labels: data.months,
      });
    } catch (error) {}
  };

  console.log({ chartData });

  // const chartData = {
  //   series: [30, 40, 45, 50, 49, 60, 70, 91, 125],
  //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // };

  console.log({ filterDate });

  const _getCharities = async () => {
    try {
      const charities = await getCharities({ createdAt: filterDate });
      setCharities(charities);
    } catch (error) {}
  };

  useEffect(() => {
    _getCharities();
  }, [filterDate]);

  useEffect(() => {
    graphData();
  }, [filterDate]);

  const handleDeleteCharity = async (id: string) => {
    try {
      await deleteCharity(id);
      message.success("charity deleted");
      _getCharities();
    } catch (error) {}
  };

  const handleUpdateCharityButton = (record: CharitiesType) => {
    dispatch(setCharity(record));
    router.push("/charity/addcharity?type=update");
  };

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/charity/addcharity");
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

        <div className="p-r-b-l-15">
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <DisplayGraph chartData={chartData} title="Charity Tracker" />
            </Col>
          </Row>
        </div>

        <Row gutter={[24, 0]} className="filter-wrapper p-15">
          <Col span={8}>
            <FormInput
              type="date"
              label="Select Date"
              placeholder="Select date"
              onDateChange={(date, dateString) => {
                setFilterDate(dateString);
              }}
            />
          </Col>
          {/* <Col span={6}>
            <FormInput type={"search"} placeholder="Search" label="Search" />
          </Col> */}
          <Col span={10}>
            <div className="form-group filter-by">
              {/* <label htmlFor="filter" style={{ marginBottom: 0 }}>
                Filter by
              </label> */}
              {/* <FormSelect
                handleChange={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
              /> */}
            </div>
          </Col>
        </Row>
        <Charity
          data={charities}
          handleDelete={(id) => handleDeleteCharity(id)}
          handlePagination={function (page: number, pageSize: number): void {
            throw new Error("Function not implemented.");
          }}
          CountData={0}
          dataPerPage={0}
          currentPage={0}
          handleUpdate={(record) => handleUpdateCharityButton(record)}
        />
      </div>
    </>
  );
};
export default CharityPage;
