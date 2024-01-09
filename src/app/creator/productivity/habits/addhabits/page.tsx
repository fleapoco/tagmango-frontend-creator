"use client";

import { useRouter } from "next/navigation";

import useAPI from "@/hooks/useApi";
import { CreateCreatorHabitType, TypeCategory } from "@/types";
import { Col, Flex, Radio, Row, Space, message } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { BreadCrumbNav } from "../../../../../../components/common/breadcrumb";
import { PrimaryButton } from "../../../../../../components/common/button";
import { FormInput } from "../../../../../../components/form/input";
import { FormSelect } from "../../../../../../components/form/select";
import PageTitle from "../../../../../../components/pagetitle";

const typeArray = ["one-time", "recurring"];

const CreatorAddHabits = () => {
  const router = useRouter();
  const { getCategories, createCreatorHabit } = useAPI();

  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const [formData, setFormData] = useState<CreateCreatorHabitType>({
    title: "",
    points: 0,
    categoryId: "",
    type: "one-time",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories({ type: TypeCategory.HABIT });
      setCategories(
        data.map((category) => ({
          label: category.title,
          value: category.id,
        }))
      );
      setFormData((formData) => ({ ...formData, categoryId: data.at(0)?.id! }));
    } catch (error) {
    } finally {
    }
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "title")
      setFormData((prev) => {
        return { ...prev, title: e.target.value };
      });
    else if (e.target.name === "points") {
      if (e.target.value.startsWith("-")) return;
      setFormData((prev) => {
        return { ...prev, points: parseInt(e.target.value) };
      });
    }
  };

  const handleSubmit = async () => {
    // console.log(formData);
    try {
      let data = await createCreatorHabit(formData);

      if ("title" in data) {
        message.success("Habit Created");
      }
    } catch (error) {
      message.error("Error Occurred!");
      console.error(error);
    } finally {
      router.push("/creator/productivity/habits");
    }
  };

  const breadCrumbItems = [
    {
      title: "Back to Habits Tracker",
      link: "/creator/productivity/habits",
    },
  ];
  return (
    <>
      <Row style={{ paddingTop: "15px" }}>
        <Col span={16} className="border-box">
          <BreadCrumbNav item={breadCrumbItems} />

          {/* Page Title */}
          <Row justify={"space-between"} style={{ alignItems: "center" }}>
            <Col span={24}>
              <PageTitle title="Create Habit" />
            </Col>
          </Row>
          <Row style={{ paddingTop: "15px" }}>
            <Col span={24}>
              <FormSelect
                label="Category"
                options={categories}
                handleChange={(value) =>
                  setFormData((formData) => ({
                    ...formData,
                    categoryId: value,
                  }))
                }
                value={formData.categoryId}
              />
              <FormInput
                label="Title"
                placeholder="Add Title"
                type="text"
                onChange={handleOnChange}
                name="title"
                value={formData.title}
              />
              <FormInput
                label="Points"
                placeholder="Add Points"
                type="number"
                onChange={handleOnChange}
                name="points"
                value={formData.points}
              />
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <Radio.Group
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, type: e.target.value };
                    })
                  }
                  name="habit-type"
                  value={formData.type}
                >
                  <Space direction="horizontal">
                    {typeArray.map((e, i) => (
                      <Radio
                        key={i}
                        value={e}
                        style={{ textTransform: "capitalize", fontWeight: 400 }}
                      >
                        {e}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>

              {formData.type === "one-time" && (
                <>
                  <FormInput
                    label="Date"
                    type="date"
                    onDateChange={(date: Date) => {
                      setFormData((prev) => {
                        return { ...prev, startDate: date.toISOString() };
                      });

                      if (formData.type === "one-time") {
                        setFormData((prev) => {
                          return { ...prev, endDate: date.toISOString() };
                        });
                      }
                    }}
                    name="startDate"
                    dateTimeValue={formData.startDate}
                  />
                  <FormInput
                    label="Time "
                    type="time"
                    onTimeChange={(time: Date) => {
                      setFormData((prev) => {
                        return { ...prev, startTime: time.toISOString() };
                      });

                      if (formData.type === "one-time") {
                        setFormData((prev) => {
                          return { ...prev, endTime: time.toISOString() };
                        });
                      }
                    }}
                    name="startTime"
                    dateTimeValue={formData.startTime}
                  />
                </>
              )}
              {formData.type === "recurring" && (
                <>
                  <FormInput label="Frequency" />
                  <FormInput label="Start Date" type="date" />
                </>
              )}

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
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default CreatorAddHabits;
