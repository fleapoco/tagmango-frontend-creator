import useAPI from '@/hooks/useApi';
import { Button, Popconfirm, Popover, message } from 'antd';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from './button';

interface ActionButtonPropType {
  actionFor?: string;
  id?: string;
  confirm?: boolean;
  horizontal?: boolean;
  fetchCreatorDegrees?: () => void;
  fetchCreatorQuizzes?: () => void;
  fetchCreatorAchievements?: () => void;
  handleEventEdit?: (id: string) => void;
  handleEventDelete?: (id: string) => void;
}

export const ActionButton = ({
  actionFor,
  id,
  confirm = true,
  fetchCreatorDegrees,
  fetchCreatorQuizzes,
  fetchCreatorAchievements,
  handleEventEdit,
  handleEventDelete,
  horizontal,
}: ActionButtonPropType) => {
  const router = useRouter();

  const { deleteDegree, deleteAchievement, deleteQuizById } = useAPI();

  const deleteQuiz = async () => {
    try {
      await deleteQuizById(id!);
      message.success('quiz Deleted');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      fetchCreatorQuizzes?.();
    }
  };

  const editDegreeAction = async () => {
    router.push(`/creator/degree/newcertification?id=${id}`);
  };

  const editQuiz = async () => {
    router.push(`/creator/quizzes/createquiz?quizId=${id}`);
  };

  const editAchievementAction = async () => {
    router.push(`/creator/achievement/newcertification?id=${id}`);
  };

  const editEventAction = async () => {
    if (handleEventEdit && id) handleEventEdit(id);
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
    if (handleEventDelete && id) handleEventDelete(id);
  };

  const handleEdit = () => {
    if (!id) return;
    if (actionFor === 'degree') editDegreeAction();
    else if (actionFor === 'achievement') editAchievementAction();
    else if (actionFor === 'quiz') editQuiz();
    else if (actionFor === 'event') editEventAction();
  };

  const handleDelete = () => {
    if (!id) return;
    if (actionFor === 'degree') deleteDegreeAction();
    else if (actionFor === 'achievement') deleteAchievementAction();
    else if (actionFor === 'event') deleteEventAction();
    else if (actionFor === 'quiz') deleteQuiz();
  };

  return (
    <>
      <Popover
        placement='top'
        className='action-btn'
        content={
          <>
            <Button
              type='text'
              style={{
                width: '100%',
                textAlign: 'left',
                marginBottom: '8px',
              }}
              onClick={handleEdit}
            >
              Edit
            </Button>

            {confirm ? (
              <Popconfirm
                title='Are you sure to delete?'
                okText='Yes'
                cancelText='No'
                onConfirm={() => {
                  handleDelete();
                }}
              >
                <Button
                  style={{ width: '100%', textAlign: 'left' }}
                  type='text'
                >
                  Delete
                </Button>
              </Popconfirm>
            ) : (
              <Button
                style={{ width: '100%', textAlign: 'left' }}
                type='text'
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </>
        }
        trigger='click'
      >
        <PrimaryButton text='' variant='info' horizontal />
      </Popover>
    </>
  );
};
