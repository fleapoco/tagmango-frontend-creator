"use client";

import { Col, Row, Spin } from "antd";

import useAPI from "@/hooks/useApi";
import { UserAchievement } from "@/types";
import { useEffect, useState } from "react";
import { CertificationCard } from "../../../components/common/certification";
import PageTitle from "../../../components/pagetitle";

const Certification = () => {
  const { getUserAchievements } = useAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(
    []
  );

  useEffect(() => {
    fetchUserAchievements();
  }, []);

  const fetchUserAchievements = async () => {
    setIsLoading(true);
    try {
      const achievementsData = await getUserAchievements();
      if (achievementsData && Array.isArray(achievementsData))
        setUserAchievements(achievementsData);
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
          <PageTitle title="Achievement" />
        </Col>
      </Row>
      {/* Events Cards */}

      <Spin size="large" spinning={isLoading}>
        <Row gutter={[16, 16]}>
          {userAchievements &&
            userAchievements.map((achievement: UserAchievement) => (
              <Col span={8} key={achievement?.id}>
                <CertificationCard achievement={achievement} />
              </Col>
            ))}
        </Row>
      </Spin>
    </>
  );
};
export default Certification;
