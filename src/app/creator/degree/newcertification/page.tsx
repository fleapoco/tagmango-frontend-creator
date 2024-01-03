"use client";

import useAPI from "@/hooks/useApi";
import { Col, Flex, Row } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { BreadCrumbNav } from "../../../../../components/common/breadcrumb";
import { PrimaryButton } from "../../../../../components/common/button";
import ImageUpload from "../../../../../components/form/imgupload";
import { FormInput } from "../../../../../components/form/input";
import { FormTextArea } from "../../../../../components/form/textarea";
import PageTitle from "../../../../../components/pagetitle";
import style from "../../../../../style/creator.module.scss";

const breadCrumbItems = [
  {
    title: "Back to Degree",
    link: "/creator/degree",
  },
];

type DegreeDataType = {
  title: string;
  degreeLink: string;
  description: string;
  thumbnailUrl: string;
};

const NewCertification = () => {
  const router = useRouter();
  const { createDegree } = useAPI();

  const [degreeDataType, setDegreeDataType] = useState<DegreeDataType>({
    title: "",
    degreeLink: "",
    description: "",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1610878180933-123728745d22?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "title")
      setDegreeDataType((prev) => {
        return { ...prev, title: e.target.value };
      });
    if (e.target.name === "degreeLink")
      setDegreeDataType((prev) => {
        return { ...prev, degreeLink: e.target.value };
      });
    if (e.target.name === "description")
      setDegreeDataType((prev) => {
        return { ...prev, description: e.target.value };
      });
  };

  const handleSubmit = async () => {
    let data = await createDegree(degreeDataType);

    if (data?.id) {
      router.push("/creator/degree");
    }
  };

  return (
    <>
      <div
        className={`${style["creator-task-details-form"]} common-panel-wrapper`}
      >
        {/* Page Title */}
        <Row className="p-15">
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title="New Degree" />
          </Col>
        </Row>
        <Row gutter={[12, 0]} className="p-r-b-l-15 ">
          <Col span={12}>
            <div className="border-box p-15">
              <ImageUpload />
              <FormInput
                label="Certification Title"
                onChange={handleOnChange}
                placeholder="Add Title"
                name="title"
              />
              <FormInput
                label="Add Link"
                type="link"
                onChange={handleOnChange}
                placeholder="Add Certification Link"
                name="degreeLink"
              />
              <div className="form-group">
                <label htmlFor="requirement">Requirement</label>
                <FormTextArea
                  placeholder="Description"
                  onChange={handleOnChange}
                  name="description"
                />
              </div>
              <Flex gap={"middle"} justify="end">
                <PrimaryButton
                  text="Cancel"
                  variant="secondary"
                  onClick={() => router.back()}
                />
                <PrimaryButton
                  text="Save"
                  variant="primary"
                  onClick={handleSubmit}
                />
              </Flex>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NewCertification;
