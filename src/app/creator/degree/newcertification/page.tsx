"use client";

import useAPI from "@/hooks/useApi";
import { APIError, UserDegree } from "@/types";
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
    thumbnailUrl: "",
  });

  const isValidFormData = (degreeData: DegreeDataType) => {
    if (
      !degreeData.title ||
      !degreeData.degreeLink ||
      !degreeData.description ||
      !degreeData.thumbnailUrl
    )
      return false;
    return true;
  };

  const handleUpload = (fileUrl: string) => {
    setDegreeDataType((prev) => {
      return { ...prev, thumbnailUrl: fileUrl };
    });
  };

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
    if (!isValidFormData) alert("Invalid/Missing Input Data");

    try {
      let data: APIError | UserDegree = await createDegree(degreeDataType);

      if ("error" in data) {
        alert(data?.message);
        return;
      }

      router.push("/creator/degree");
    } catch (error) {}
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
              <ImageUpload handleUpload={handleUpload} />
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
                  disabled={!isValidFormData(degreeDataType)}
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
