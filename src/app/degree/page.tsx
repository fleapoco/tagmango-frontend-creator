"use client";

import { Col, Row, Spin } from "antd";

import useAPI from "@/hooks/useApi";
import { UserDegree } from "@/types";
import { useEffect, useState } from "react";
import { CertificationCard } from "../../../components/common/certification";
import PageTitle from "../../../components/pagetitle";

const Certification = () => {
  const { getUserDegrees } = useAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDegrees, setUserDegrees] = useState<UserDegree[]>([]);

  useEffect(() => {
    fetchUserDegrees();
  }, []);

  const fetchUserDegrees = async () => {
    setIsLoading(true);
    try {
      const degreeData = await getUserDegrees();
      if (degreeData && Array.isArray(degreeData)) setUserDegrees(degreeData);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Page Title */}
      <Row style={{ padding: "15px 0" }}>
        <Col span={24}>
          <PageTitle title="Degree" />
        </Col>
      </Row>
      {/* Events Cards */}

      <Spin size="large" spinning={isLoading}>
        <Row gutter={[16, 16]}>
          {userDegrees &&
            userDegrees.map((degree: UserDegree) => (
              <Col span={8} key={degree?.id}>
                <CertificationCard degree={degree} />
              </Col>
            ))}
        </Row>
      </Spin>
    </>
  );
};
export default Certification;
