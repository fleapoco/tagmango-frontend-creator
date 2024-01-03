import {
  CalendarProps,
  Checkbox,
  Col,
  Flex,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import type { Dayjs } from "dayjs";
const { Title } = Typography;

import useAPI from "@/hooks/useApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getTasksCounts,
  setTaskCounts,
} from "@/redux/reducers/task-counts.reducer";
import { GetTask, TaskStatus } from "@/types";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { PrimaryCard } from "./common/card";
import { CustomTag } from "./common/tag";

interface CustomDateRange {
  start: string;
  end: string;
}

export const CompleteTodayTasks = ({
  onUpdateStatus,
}: {
  onUpdateStatus: () => void;
}) => {
  const dispatch = useAppDispatch();

  const taskCount = useAppSelector(getTasksCounts);
  console.log({ taskCount });
  const { getTodaysTasks, updateTaskStatus, taskCounts, getTasks } = useAPI();
  const [task, setTasks] = useState<GetTask[]>([]);
  const [allTasks, setAllTasks] = useState<GetTask[]>();

  const [debouncedChecked, setDebouncedChecked] = useState<{
    taskId: string;
    status: TaskStatus;
  } | null>(null);
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const fetchTasksWithUniqueGroupFalse = async () => {
    try {
      const data = await getTasks({ uniqueGroup: false });
      setAllTasks(data);
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

      onUpdateStatus();
      message.success("status updated");
      const counts = await taskCounts();
      dispatch(setTaskCounts(counts));
    } catch (error) {}
  };

  const onChange = (e: CheckboxChangeEvent, task: GetTask) => {
    setDebouncedChecked({
      taskId: task.id ?? "",
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

  return (
    <>
      <Row className="complete-you-tasks-cards  tasks-card" align="top">
        <Col span={24}></Col>
        {task && (
          <Row
            gutter={[0, 12]}
            style={{ width: "100%", alignItems: "baseline" }}
          >
            {task?.map((e) => (
              <Col span={24} key={e.id}>
                <PrimaryCard>
                  <Space
                    style={{
                      width: "100%",
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Space className="strike-check-box">
                      <Checkbox
                        defaultChecked={e.status === TaskStatus.COMPLETED}
                        onChange={(event) => onChange(event, e)}
                        style={{ textTransform: "capitalize" }}
                      >
                        {e.title}
                      </Checkbox>
                    </Space>
                    <span className="mock-block custom-tag-wrapper">
                      <CustomTag
                        color="default"
                        title={
                          <>
                            <Flex align="center" gap={3}>
                              <MdOutlineWatchLater />{" "}
                              <span>
                                {dayjs(e.startTime).format("hh:mm A")}
                              </span>
                            </Flex>
                          </>
                        }
                      />
                    </span>
                  </Space>
                </PrimaryCard>
              </Col>
            ))}
          </Row>
        )}
      </Row>
    </>
  );
};
