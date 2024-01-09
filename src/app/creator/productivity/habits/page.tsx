"use client";
import useAPI from "@/hooks/useApi";
import { CreateCreatorHabitType } from "@/types";
import { Col, Progress, Row } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../../../components/common/button";
import FullCalendarData from "../../../../../components/common/fullcalendar";
import { AddIcon } from "../../../../../components/common/icons";
import PageTitle from "../../../../../components/pagetitle";
import style from "../../../../../style/creator.module.scss";

interface HabitCalenderType {
  title: string;
  start: string | Date;
  end: string | Date;
  progress: React.ReactNode;
  backgroundColor: string;
  borderColor: string;
}

const CreatorHabit = () => {
  const router = useRouter();
  const { getCreatorHabits } = useAPI();
  const [habitData, setHabitData] = useState<HabitCalenderType[]>([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      let data = await getCreatorHabits();
      if (data && Array.isArray(data)) setHabitData(transformHabitData(data));
    } catch (error) {}
  };

  const transformHabitData = (
    data: CreateCreatorHabitType[]
  ): HabitCalenderType[] => {
    return data.map((item, index) => ({
      title: item.title,
      start: dayjs(item.date!).format("YYYY-MM-DD"),
      end: dayjs(item.date!).format("YYYY-MM-DD")!,
      progress: (
        <Progress
          percent={parseFloat(
            ((item.completedCount! / item.subscriberCount!) * 100).toFixed(2)
          )}
        />
      ),
      backgroundColor: index % 2 ? "#fa6800" : "d80473",
      borderColor: index % 2 ? "#fa6800" : "d80473",
    }));
  };

  const handleButtonClick = () => {
    router.push("/creator/productivity/habits/addhabits");
  };

  return (
    <>
      <div className={`${style["event-tasks-page"]} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center" }}
          className="p-15"
        >
          <Col span={12}>
            <PageTitle title="Habits Tracker" />
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            <PrimaryButton
              text="Add Habits"
              icon={<AddIcon />}
              variant="primary"
              onClick={handleButtonClick}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="p-15">
              <FullCalendarData data={habitData} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreatorHabit;
