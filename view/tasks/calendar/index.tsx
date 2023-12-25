import {
  Calendar,
  CalendarProps,
  Checkbox,
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
import { useAppDispatch } from '@/hooks/useRedux';
import { setTaskCounts } from '@/redux/reducers/task-counts.reducer';
import { GetTask, TaskStatus } from '@/types';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { PrimaryCard } from '../../../components/common/card';
import { CustomTag } from '../../../components/common/tag';

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
      <div className={`${style['charity-page']}`}>
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
            <div className='complete-you-tasks-cards border-box'>
              <Row>
                <Title level={4} className='sub-title'>
                  Complete today's Tasks (5)
                </Title>
                {task && (
                  <Row gutter={[0, 12]} style={{ width: '100%' }}>
                    {task.map((e) => (
                      <Col span={24} key={e.id}>
                        <PrimaryCard>
                          <Space
                            style={{
                              width: '100%',
                              alignItems: 'start',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Space className='strike-check-box'>
                              <Checkbox
                                defaultChecked={
                                  e.status === TaskStatus.COMPLETED
                                }
                                onChange={(event) => onChange(event, e)}
                              >
                                {e.title}
                              </Checkbox>
                            </Space>
                            <span className='mock-block'>
                              <CustomTag
                                variant='gray'
                                title={dayjs(e.startTime).format('hh:mm')}
                              />
                            </span>
                          </Space>
                        </PrimaryCard>
                      </Col>
                    ))}
                  </Row>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
