export interface IFetchAPICall {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export enum TaskType {
  ONE_TIME = "one-time",
  RECURRING = "recurring",
}
export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export enum TaskFrequency {
  DAILY = "daily",
  BI_WEEKLY = "bi-weekly",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}
export enum TypeCategory {
  TASK = "task",
}

export interface TaskAnalytics {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
}

export interface GetTasksQuery {
  query: string;
  status: TaskStatus;
  type: TaskType;
}

export interface GetTask {
  id?: string;
  category: CategoryType | null;
  categoryId?: string | null;
  endDate: string | null;
  endTime: string | null;
  firstDayOfTheWeek: string;
  frequency: TaskFrequency;
  secondDayOfTheWeek: string;
  points: number;
  startDate: string | null;
  startTime: string | null;
  status: TaskStatus;
  title: string;
  type: TaskType;
}

export interface DataAnalyticsTypes {
  id?: string;
  revenueEarned?: number;
  adSpends?: number;
  costPerLead?: number;
  adSpendsReturn?: number;
  vipGroupSize?: number;
  totalPaidCustomers?: number;
  totalLeadsGenerated?: number;
  month?: string | null;
}

export interface CategoryType {
  id?: string;
  creatorId: string;
  title: string;
  type: TypeCategory;
}

export interface CharitiesType {
  id?: string;
  organizationName: string;
  amount?: number;
  category: CategoryType | null;
  categoryId?: string | null;
  createdAt: string;
}
