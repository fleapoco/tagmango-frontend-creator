"use client";
import Loading from "@/app/loading";
import useAPI from "@/hooks/useApi";
import { CreateCreatorHabitType } from "@/types";
import { Col, Progress, Row, message } from "antd";
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
  const { getCreatorHabits, updateCreatorHabitByDragDrop } = useAPI();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [habitData, setHabitData] = useState<HabitCalenderType[]>([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      let data = await getCreatorHabits();
      if (data && Array.isArray(data)) setHabitData(transformHabitData(data));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const transformHabitData = (
    data: CreateCreatorHabitType[]
  ): HabitCalenderType[] => {
    return data.map((item, index) => ({
      habitId: item.id!,
      title: item.title,
      start: dayjs(item.date!).format("YYYY-MM-DD"),
      end: dayjs(item.date!).format("YYYY-MM-DD")!,
      reDirectUrl: `${window.location.href}/details?id=${item.id}`,
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

  const handleEventClick = (arg: any) => {
    router.push(arg.event._def.extendedProps.reDirectUrl);
  };

  const handleEventChange = async (arg: any) => {
    // console.log(arg?.event?.end);
    try {
      let habitId = arg?.event?._def?.extendedProps?.habitId;
      let updatedDate = new Date(arg.event?.start).toISOString();
      let data = await updateCreatorHabitByDragDrop(
        { date: updatedDate },
        habitId
      );

      if ("statusCode" in data) {
        message.error("Something went wrong!");
      }
    } catch (error) {}
  };

  const handleButtonClick = () => {
    router.push("/creator/productivity/habits/addhabits");
  };

  return (
    <>
      {isLoading ? (
        <Loading pageloader={true} loading={isLoading} />
      ) : (
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
                <FullCalendarData
                  data={habitData}
                  editable={true}
                  handleEventClick={handleEventClick}
                  handleEventChange={handleEventChange}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default CreatorHabit;
