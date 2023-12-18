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

export interface GetTasksQuery {
  query: string;
  status: TaskStatus;
  type: TaskType;
}

export interface GetTask {
  category: string | null;

  endDate: string | null;
  endTime: string | null;
  firstDayOfTheWeek: string;
  frequency: string;

  lastDayOfTheWeek: string;
  points: number;
  startDate: string | null;
  startTime: string | null;
  status: string;
  title: string;
  type: string;
}
