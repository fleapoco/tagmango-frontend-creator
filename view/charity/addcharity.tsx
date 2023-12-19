import { initialCharitiesState } from "@/empty-state-objects/empty";
import useAPI from "@/hooks/useApi";
import { CharitiesType } from "@/types";
import { Col, Flex, Row } from "antd";
import { useState } from "react";
import { PrimaryButton } from "../../components/common/button";
import { FormInput } from "../../components/form/input";
import { FormSelect } from "../../components/form/select";
import PageTitle from "../../components/pagetitle";

export const AddCharity = () => {
  const { createCharities } = useAPI();
  const [fromData, setFormData] = useState<Partial<CharitiesType>>(
    initialCharitiesState
  );

  const handleCreateCharity = async () => {
    try {
      await createCharities(fromData);
    } catch (error) {}
  };

  return (
    <>
      <div className={`common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center" }}
          className="p-15"
        >
          <Col span={24}>
            <PageTitle title="Add Data" />
          </Col>
        </Row>
        <div className="gray-box p-15">
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <FormSelect
                label="Category"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled" },
                ]}
              />
            </Col>
            <Col span={24}>
              <FormInput
                placeholder=""
                label="Amount Donated"
                icon={"₹"}
                type="number"
                value={fromData.amount}
                onChange={(e) =>
                  setFormData({ ...fromData, amount: Number(e.target.value) })
                }
              />
            </Col>
            <Col span={24}>
              <FormInput
                placeholder=""
                label="Organisation Name"
                type="text"
                value={fromData.organizationName}
                onChange={(e) =>
                  setFormData({
                    ...fromData,
                    organizationName: e.target.value,
                  })
                }
              />
            </Col>
            <Col span={24}>
              <Flex gap="middle" justify="end">
                <PrimaryButton variant="secondary" text="Cancel" />
                <PrimaryButton
                  variant="dark"
                  text="Save"
                  onClick={handleCreateCharity}
                />
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
