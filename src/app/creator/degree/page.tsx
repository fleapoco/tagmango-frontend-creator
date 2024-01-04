"use client";

import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import style from "../../../../style/task.module.scss";

import { PrimaryButton } from "../../../../components/common/button";
import { AddIcon } from "../../../../components/common/icons";
import PageTitle from "../../../../components/pagetitle";

import { Card } from "antd";

const { Meta } = Card;

import useAPI from "@/hooks/useApi";
import { UserDegree } from "@/types";
import { Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

const CreatorCertification = () => {
  const router = useRouter();
  const { getCreatorDegrees } = useAPI();
  const [creatorDegrees, setCreatorDegrees] = useState<UserDegree[]>([]);

  useEffect(() => {
    fetchCreatorDegrees();
  }, []);

  const fetchCreatorDegrees = async () => {
    try {
      const degreeData = await getCreatorDegrees();
      if (degreeData && Array.isArray(degreeData))
        setCreatorDegrees(degreeData);
    } catch (error) {}
  };

  const handleButtonClick = () => {
    router.push("/creator/degree/newcertification");
  };
  return (
    <>
      <div className={`${style["task-page"]}`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center", padding: "15px 0" }}
        >
          <Col span={12}>
            <PageTitle title="Degree" />
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            <PrimaryButton
              text="New Degree"
              icon={<AddIcon />}
              onClick={handleButtonClick}
              variant="primary"
            />
          </Col>
        </Row>
        {/* Events Cards */}
        <Row
          gutter={[16, 16]}
          style={{ flexWrap: "wrap", alignItems: "stretch" }}
        >
          {creatorDegrees &&
            creatorDegrees.map((degree: UserDegree) => (
              <Col md={12} lg={8} xl={6}>
                <Card
                  className="certification-card"
                  style={{ width: "100%" }}
                  cover={
                    <>
                      <img alt={degree?.title} src={degree?.thumbnailUrl} />
                      <div className="cover-over-img">
                        <PrimaryButton variant="info" />
                      </div>
                    </>
                  }
                >
                  <Meta
                    title={degree?.title}
                    description={
                      <div className="events-card-description">
                        <p style={{ marginBottom: 0 }}>{degree?.description}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};
export default CreatorCertification;
