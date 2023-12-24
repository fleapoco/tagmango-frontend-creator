import { initialCharitiesState } from "@/empty-state-objects/empty";
import useAPI from "@/hooks/useApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { CharitiesType, TypeCategory } from "@/types";
import { Col, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../components/form/input";
import { FormSelect } from "../../components/form/select";

interface Props {
  charityData: CharitiesType;
  open: boolean;
  onCancel: () => void;
}

const UpdateCharityModal: React.FC<Props> = ({
  charityData,
  open,
  onCancel,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { getCategories, updateCharity } = useAPI();
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  console.log(charityData);
  const [data, setData] = useState(initialCharitiesState);

  const handleUpdateAnalytic = async () => {
    try {
      setLoading(true);
      await updateCharity(charityData.id!, data);
      message.success("charity updated");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories({ type: TypeCategory.CHARITY });
      setCategories(
        res.map((category) => ({
          label: category.title,
          value: category.id,
        }))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (charityData) {
      setData({
        organizationName: charityData.organizationName,
        amount: charityData.amount,
        categoryId: charityData.categoryId,
      });
      fetchCategories();
    }
  }, [charityData]);

  return (
    <Modal
      open={open}
      confirmLoading={loading}
      onOk={handleUpdateAnalytic}
      okText={"save"}
      onCancel={onCancel}
    >
      <Col span={24}>
        <FormSelect
          label="Category"
          options={categories}
          handleChange={(value) =>
            setData((data) => ({
              ...data,
              categoryId: value,
            }))
          }
          value={data.categoryId}
        />
      </Col>
      <Col span={24}>
        <FormInput
          placeholder=""
          label="Amount Donated"
          icon={"₹"}
          type="number"
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
        />
      </Col>
      <Col span={24}>
        <FormInput
          placeholder=""
          label="Organisation Name"
          type="text"
          value={data.organizationName}
          onChange={(e) =>
            setData({
              ...data,
              organizationName: e.target.value,
            })
          }
        />
      </Col>
    </Modal>
  );
};

export default UpdateCharityModal;
