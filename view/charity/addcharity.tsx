import { initialCharitiesState } from "@/empty-state-objects/empty";
import useAPI from "@/hooks/useApi";
import { CharitiesType, TypeCategory } from "@/types";
import { Col, Flex, Row, message } from "antd";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/common/button";
import { FormInput } from "../../components/form/input";
import { FormSelect } from "../../components/form/select";
import PageTitle from "../../components/pagetitle";

export const AddCharity = () => {
  const { createCharities, getCategories } = useAPI();
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [fromData, setFormData] = useState<Partial<CharitiesType>>(
    initialCharitiesState
  );

  const handleCreateCharity = async () => {
    try {
      await createCharities(fromData);
      setFormData(initialCharitiesState);
      message.success("charity added");
    } catch (error) {
    } finally {
    }
  };

  const fetchCharities = async () => {
    try {
      const data = await getCategories({ type: TypeCategory.TASK });
      setCategories(
        data.map((charity) => ({
          label: charity.title,
          value: charity.id ?? "",
        }))
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchCharities();
  }, []);

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
                options={categories}
                handleChange={(value) =>
                  setFormData({ ...fromData, categoryId: value })
                }
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
