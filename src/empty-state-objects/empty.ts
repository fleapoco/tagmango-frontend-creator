import {
  CharitiesType,
  DataAnalyticsTypes,
  GetTask,
  TaskAnalytics,
  TaskFrequency,
  TaskStatus,
  TaskType,
} from "@/types";
import dayjs from "dayjs";

export const initialTaskState: GetTask = {
  endDate: dayjs().toString(),
  endTime: null,
  firstDayOfTheWeek: null,
  frequency: TaskFrequency.DAILY,
  secondDayOfTheWeek: null,
  points: 0,
  startDate: dayjs().toString(),
  startTime: null,
  status: TaskStatus.PENDING,
  title: "",
  dayOfTheMonth: null,
  type: TaskType.ONE_TIME,
};

export const initialTaskCounts: TaskAnalytics = {
  pending: 0,
  inProgress: 0,
  completed: 0,
  total: 0,
};

export const initialDataAnalyticsState: DataAnalyticsTypes = {
  revenueEarned: 0,
  adSpends: 0,
  costPerLead: 0,
  adSpendsReturn: 0,
  vipGroupSize: 0,
  totalPaidCustomers: 0,
  totalLeadsGenerated: 0,
  month: null,
};

export const initialCharitiesState: CharitiesType = {
  organizationName: "",
  amount: 0,

  categoryId: null,
  date: dayjs().toISOString(),
};
