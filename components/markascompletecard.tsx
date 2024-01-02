import useApi from "@/hooks/useApi";
import { HabitType } from "@/types";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import { PrimaryButton } from "./common/button";
import { PrimaryCard } from "./common/card";
import { CustomTag } from "./common/tag";
const { Title } = Typography;

const MarkAsCompleteCard = ({
  habitData,
  onMarkComplete,
}: {
  habitData?: HabitType;
  onMarkComplete: () => void;
}) => {
  const { updateHabitStatusByUser, removeUserHabit } = useApi();
  // const [data, setData] = useState();

  const handleMarkComplete = async () => {
    try {
      await updateHabitStatusByUser({
        creatorId: habitData?.creatorId!,
        habitId: habitData?.id!,
        habitTitle: habitData?.title ?? "",
        habitPoints: habitData?.points ?? 0,
      });

      message.success("Habit Marked Completed");
      onMarkComplete();
    } catch (error) {}
  };

  const removeHabit = async () => {
    try {
      if (habitData?.habitSubmit !== null) {
        await removeUserHabit(habitData?.habitSubmit.id!);
        onMarkComplete();
      } else {
        await updateHabitStatusByUser({
          creatorId: habitData?.creatorId!,
          habitId: habitData?.id!,
          habitTitle: habitData?.title ?? "",
          habitPoints: 0,
          deletedAt: new Date() as unknown as string,
        });
        onMarkComplete();
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="marks-as-complete-card">
      <PrimaryCard
        extra={
          <>
            <Button type="text" shape="circle" size="small">
              <CloseOutlined size={2} onClick={removeHabit} />
            </Button>
          </>
        }
      >
        <div className="content">
          <Title level={5}>{habitData?.title}</Title>
          <PrimaryButton
            text={
              <>
                {habitData?.habitSubmit !== null
                  ? "completed"
                  : "Mark as complete"}
                &nbsp;
                <CustomTag color="#87d068" title={habitData?.points} />
              </>
            }
            size="small"
            variant={habitData?.habitSubmit !== null ? "primary" : "secondary"}
            onClick={() => handleMarkComplete()}
          />
        </div>
      </PrimaryCard>
    </div>
  );
};

export default MarkAsCompleteCard;
