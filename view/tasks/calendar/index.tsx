import { Calendar, CalendarProps, Col, Row, Typography, message } from 'antd';
import type { Dayjs } from 'dayjs';
import style from '../../../style/task.module.scss';
const { Title } = Typography;

import useAPI from '@/hooks/useApi';
import { useAppDispatch } from '@/hooks/useRedux';
import { setTaskCounts } from '@/redux/reducers/task-counts.reducer';
import { GetTask, TaskStatus } from '@/types';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CompleteTodayTasks from '../../../components/completetodaytaskcard';

export const CalendarTask = () => {
  const dispatch = useAppDispatch();
  const { getTodaysTasks, updateTask, taskCounts } = useAPI();
  const [task, setTasks] = useState<GetTask[]>();
  const [debouncedChecked, setDebouncedChecked] = useState<{
    taskId: string;
    status: TaskStatus;
  } | null>(null);
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const _getTodayTasks = async () => {
    try {
      const tasks = await getTodaysTasks();
      setTasks(tasks ?? []);
    } catch (error) {}
  };

  const debouncedUpdateTask = async (taskId: string, status: TaskStatus) => {
    try {
      await updateTask(taskId, { status });
      _getTodayTasks();
      message.success('status updated');
      const counts = await taskCounts();
      dispatch(setTaskCounts({ ...counts }));
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
  }, []);

  return (
    <>
      <div className={`${style['task-page-calendar']}`}>
        <Row gutter={[16, 0]}>
          <Col span={16}>
            <div className='border-box'>
              <Calendar
                value={dayjs('2017-01-25')}
                onPanelChange={onPanelChange}
              />
            </div>
          </Col>
          <Col span={8}>
            <Row>
              <Title
                level={5}
                className='sub-title'
                style={{ margin: '0 0 18px 0' }}
              >
                Complete today's Tasks (5)
              </Title>

              <Row gutter={[0, 12]} style={{ width: '100%' }}>
                {[1, 2, 3, 4].map((e) => (
                  <Col span={24}>
                    <CompleteTodayTasks />
                  </Col>
                ))}
              </Row>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
