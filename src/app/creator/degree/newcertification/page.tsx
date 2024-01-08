"use client";

import useAPI from "@/hooks/useApi";
import { APIError, UserDegree } from "@/types";
import { Col, Flex, Row, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
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
  const { createDegree, getCreatorDegreeById, updateDegree } = useAPI();
  const params = useSearchParams();
  const degreeId = params.get("id");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [degreeDataType, setDegreeDataType] = useState<DegreeDataType>({
    title: "",
    degreeLink: "",
    description: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    if (degreeId) {
      fetchDegreeById(degreeId);
    }
  }, [degreeId]);

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

  const fetchDegreeById = async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      let data: APIError | UserDegree = await getCreatorDegreeById(id);

      if (
        "title" in data &&
        "degreeLink" in data &&
        "description" in data &&
        "thumbnailUrl" in data
      ) {
        setDegreeDataType({
          title: data.title,
          degreeLink: data.degreeLink,
          description: data.description,
          thumbnailUrl: data.thumbnailUrl,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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

  const updateDegreeAction = async () => {
    try {
      let data: APIError | UserDegree = await updateDegree(
        degreeDataType,
        degreeId
      );

      if ("statusCode" in data) {
        alert(data?.message);
        return;
      }

      router.push("/creator/degree");
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!isValidFormData) alert("Invalid/Missing Input Data");

    try {
      if (degreeId) {
        await updateDegreeAction();
        return;
      }

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
      <Spin size="large" spinning={isLoading}>
        <div className={`${style["creator-task-details-form"]} `}>
          {/* Page Title */}
          <Row style={{ padding: "15px 0" }}>
            <Col span={24}>
              <BreadCrumbNav item={breadCrumbItems} />
              <PageTitle title={degreeId ? "Edit Degree" : "New Degree"} />
            </Col>
          </Row>
          <Row gutter={[12, 0]}>
            <Col span={12}>
              <div className="border-box p-15">
                <ImageUpload
                  handleUpload={handleUpload}
                  existImageUrl={degreeId ? degreeDataType.thumbnailUrl : ""}
                />
                <FormInput
                  label="Degree Title"
                  onChange={handleOnChange}
                  placeholder="Add Title"
                  name="title"
                  value={degreeDataType.title}
                />
                <FormInput
                  label="Add Link"
                  type="link"
                  onChange={handleOnChange}
                  placeholder="Add Certification Link"
                  name="degreeLink"
                  value={degreeDataType.degreeLink}
                />
                <div className="form-group">
                  <label htmlFor="requirement">Requirement</label>
                  <FormTextArea
                    placeholder="Description"
                    onChange={handleOnChange}
                    name="description"
                    value={degreeDataType.description}
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
      </Spin>
    </>
  );
};

export default NewCertification;
