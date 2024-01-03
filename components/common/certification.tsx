import { UserDegree } from "@/types";
import { Card, Typography } from "antd";
import { PrimaryButton } from "./button";

const { Meta } = Card;

const { Title } = Typography;

type CertificationCardObject = {
  degree: UserDegree;
};

export const CertificationCard = ({ degree }: CertificationCardObject) => {
  return (
    <>
      <Card
        className="certification-card"
        style={{ width: "100%" }}
        cover={<img alt={degree?.title} src={degree?.thumbnailUrl} />}
      >
        <Meta
          title={degree?.title}
          description={
            <div className="events-card-description">
              <p>{degree?.description}</p>
              <PrimaryButton text="Apply Now" variant="primary" />
            </div>
          }
        />
      </Card>
    </>
  );
};
