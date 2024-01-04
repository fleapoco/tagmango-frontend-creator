import useAPI from "@/hooks/useApi";
import { Button, Popconfirm, Popover } from "antd";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./button";

interface ActionButtonPropType {
  actionFor?: string;
  id?: string;
  fetchCreatorDegrees?: () => void;
  fetchCreatorAchievements?: () => void;
  fetchEventData?: () => void;
}

export const ActionButton = ({
  actionFor,
  id,
  fetchCreatorDegrees,
  fetchCreatorAchievements,
  fetchEventData,
}: ActionButtonPropType) => {
  const router = useRouter();
  const { deleteDegree, deleteAchievement, deleteEvent } = useAPI();

  const editDegreeAction = async () => {
    router.push(`/creator/degree/newcertification?id=${id}`);
  };

  const editAchievementAction = async () => {
    router.push(`/creator/achievement/newcertification?id=${id}`);
  };

  const deleteDegreeAction = async () => {
    try {
      let res = await deleteDegree(id);
      if (res) alert(res?.message);
    } catch (error) {
      console.error(error);
    } finally {
      if (fetchCreatorDegrees) fetchCreatorDegrees();
    }
  };

  const deleteAchievementAction = async () => {
    try {
      let res = await deleteAchievement(id);
      if (res) alert(res?.message);
    } catch (error) {
      console.error(error);
    } finally {
      if (fetchCreatorAchievements) fetchCreatorAchievements();
    }
  };

  const deleteEventAction = async () => {
    try {
      let res = await deleteEvent(id);
      if (res) alert(res?.message);
    } catch (error) {
      console.error(error);
    } finally {
      if (fetchEventData) fetchEventData();
    }
  };

  const handleEdit = () => {
    if (!id) return;
    if (actionFor === "degree") editDegreeAction();
    else if (actionFor === "achievement") editAchievementAction();
  };

  const handleDelete = () => {
    if (!id) return;
    if (actionFor === "degree") deleteDegreeAction();
    else if (actionFor === "achievement") deleteAchievementAction();
    else if (actionFor === "event") deleteEventAction();
  };

  return (
    <>
      <Popover
        placement="top"
        className="action-btn"
        content={
          <>
            <Button
              type="text"
              style={{
                width: "100%",
                textAlign: "left",
                marginBottom: "8px",
              }}
              onClick={handleEdit}
            >
              Edit
            </Button>

            <Popconfirm
              title="Are you sure to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDelete}
            >
              <Button style={{ width: "100%", textAlign: "left" }} type="text">
                Delete
              </Button>
            </Popconfirm>
          </>
        }
        trigger="click"
      >
        <PrimaryButton text="" variant="info" horizontal />
      </Popover>
    </>
  );
};
