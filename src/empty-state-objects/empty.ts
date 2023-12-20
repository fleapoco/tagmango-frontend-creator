import {
  CharitiesType,
  DataAnalyticsTypes,
  GetTask,
  TaskAnalytics,
  TaskFrequency,
  TaskStatus,
  TaskType,
} from "@/types";

export const initialTaskState: GetTask = {
  category: null,
  categoryId: null,

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
  createdAt: "",
  organizationName: "",
  amount: 0,
  category: null,
  categoryId: null,
};
