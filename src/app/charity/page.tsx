"use client";

import useAPI from "@/hooks/useApi";
import { CharitiesType } from "@/types";
import { Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { DisplayGraph } from "../../../components/common/graph";
import { FormInput } from "../../../components/form/input";
import { FormSelect } from "../../../components/form/select";
import { Charity } from "../../../view/charity";

const CharityPage = () => {
  const { getCharities, deleteCharity } = useAPI();
  const [charities, setCharities] = useState<CharitiesType[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");

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

  const handleDeleteCharity = async (id: string) => {
    try {
      await deleteCharity(id);
      message.success("charity deleted");
      _getCharities();
    } catch (error) {}
  };

  return (
    <>
      <div className="gray-box p-15 charity-table">
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <DisplayGraph />
          </Col>
          <Col span={24}>
            <div style={{ background: "#fff", padding: "15px" }}>
              <Row gutter={[24, 0]} className="filter-wrapper">
                <Col span={6}>
                  <FormInput
                    type="search"
                    placeholder="Search"
                    label="Search"
                  />
                </Col>
                <Col span={10}>
                  <div className="form-group filter-by">
                    <label htmlFor="filter" style={{ marginBottom: 0 }}>
                      Filter by
                    </label>
                    <FormSelect
                      handleChange={function (value: string): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </div>
                </Col>
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
              </Row>
              <Charity
                data={charities}
                handleDelete={(id) => handleDeleteCharity(id)}
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
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CharityPage;
