import {
  Calendar,
  CalendarProps,
  Col,
  Row,
  Space,
  Typography,
  message,
} from 'antd';
import type { Dayjs } from 'dayjs';
import style from '../../../style/task.module.scss';
const { Title } = Typography;

import useAPI from '@/hooks/useApi';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
  getTasksCounts,
  setTaskCounts,
} from '@/redux/reducers/task-counts.reducer';
import { GetTask, TaskStatus } from '@/types';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CustomTag } from '../../../components/common/tag';
import { CompleteTodayTasks } from '../../../components/completetodaytaskcard';

interface CustomDateRange {
  start: string;
  end: string;
}

export const CalendarTask = () => {
  const dispatch = useAppDispatch();

  const taskCount = useAppSelector(getTasksCounts);
  console.log({ taskCount });
  const { getTodaysTasks, updateTaskStatus, taskCounts, getTasks } = useAPI();
  const [task, setTasks] = useState<GetTask[]>();
  const [allTasks, setAllTasks] = useState<GetTask[]>([]);

  const [debouncedChecked, setDebouncedChecked] = useState<{
    taskId: string;
    status: TaskStatus;
  } | null>(null);
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const fetchTasksWithUniqueGroupFalse = async () => {
    try {
      const data = await getTasks({ uniqueGroup: false });
      setAllTasks(data ?? []);
    } catch (error) {}
  };

  const _getTodayTasks = async () => {
    try {
      const tasks = await getTodaysTasks();
      setTasks(tasks ?? []);
    } catch (error) {}
  };

  const debouncedUpdateTask = async (taskId: string, status: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, { status });
      _getTodayTasks();
      fetchTasksWithUniqueGroupFalse();
      message.success('status updated');
      const counts = await taskCounts();
      dispatch(setTaskCounts(counts));
    } catch (error) {}
  };

  const onChange = (e: CheckboxChangeEvent, task: GetTask) => {
    setDebouncedChecked({
      taskId: task.id ?? '',
      status: e.target.checked ? TaskStatus.COMPLETED : TaskStatus.PENDING,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (debouncedChecked !== null) {
      timer = setTimeout(() => {
        debouncedUpdateTask(debouncedChecked.taskId, debouncedChecked.status);
        setDebouncedChecked(null);
      }, 600);
    }

    return () => clearTimeout(timer);
  }, [debouncedChecked]);

  useEffect(() => {
    _getTodayTasks();
    fetchTasksWithUniqueGroupFalse();
  }, []);

  const monthCellRender = (value: Dayjs) => {
    const formattedMonth = value.format('YYYY-MM');
    const tasksInMonth = allTasks?.filter((t) =>
      dayjs(t.startDate).isSame(formattedMonth, 'month')
    );

    return (
      <div>
        {tasksInMonth?.map((task) => (
          <div key={task.id} style={{ marginBottom: 8 }}>
            {/* Check if the task's startDate matches the current cell's date */}
            {dayjs(task.startDate).isSame(value, 'day') && (
              <Space>
                <CustomTag
                  color={
                    task.status === TaskStatus.COMPLETED ? '#87d068' : 'warning'
                  }
                  title={`${dayjs(task.startTime).format('hh:mm A')} ${
                    task.title
                  } `}
                />
              </Space>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={`${style['task-page-calendar']}`}>
        <Row gutter={[16, 0]}>
          <Col span={16}>
            <div className='border-box calendar-main'>
              <Calendar
                onPanelChange={onPanelChange}
                cellRender={monthCellRender}
              />
            </div>
          </Col>
          <Col span={8}>
            <div
              className='border-box'
              style={{ width: '100%', height: '100%' }}
            >
              <Row className='complete-you-tasks-cards  tasks-card' align='top'>
                <Col span={24}>
                  <Title
                    level={5}
                    className='sub-title'
                    style={{ margin: '0 0 18px 0' }}
                  >
                    Complete today's Tasks {task?.length}
                  </Title>
                </Col>
                <CompleteTodayTasks
                  onUpdateStatus={() => fetchTasksWithUniqueGroupFalse()}
                />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
