"use client";

import { Col, Row } from "antd";

import useAPI from "@/hooks/useApi";
import { UserDegree } from "@/types";
import { useEffect, useState } from "react";
import { CertificationCard } from "../../../components/common/certification";
import PageTitle from "../../../components/pagetitle";

const Certification = () => {
  const { getUserDegrees } = useAPI();
  const [userDegrees, setUserDegrees] = useState<UserDegree[]>([]);

  useEffect(() => {
    fetchUserDegrees();
  }, []);

  const fetchUserDegrees = async () => {
    try {
      const degreeData = await getUserDegrees();
      if (degreeData && Array.isArray(degreeData)) setUserDegrees(degreeData);
    } catch (error) {}
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

      <Row gutter={[16, 16]}>
        {userDegrees &&
          userDegrees.map((degree: UserDegree) => (
            <Col span={8} key={degree?.id}>
              <CertificationCard degree={degree} />
            </Col>
          ))}
      </Row>
    </>
  );
};
export default Certification;
