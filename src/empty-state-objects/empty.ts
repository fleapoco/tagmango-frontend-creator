import {
  GetTask,
  TaskAnalytics,
  TaskFrequency,
  TaskStatus,
  TaskType,
} from "@/types";

export const initialTaskState: GetTask = {
  category: null,

  endDate: null,
  endTime: null,
  firstDayOfTheWeek: "",
  frequency: TaskFrequency.DAILY,
  secondDayOfTheWeek: "",
  points: 0,
  startDate: null,
  startTime: null,
  status: TaskStatus.PENDING,
  title: "",
  type: TaskType.ONE_TIME,
};

export const initialTaskCounts: TaskAnalytics = {
  pending: 0,
  inProgress: 0,
  completed: 0,
  total: 0,
};
