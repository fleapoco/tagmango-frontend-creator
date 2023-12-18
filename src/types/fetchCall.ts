export interface IFetchAPICall {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface GetTask {
  category: string | null;
  createdAt: string;
  deletedAt: string | null;
  endDate: string;
  endTime: string;
  firstDayOfTheWeek: string;
  frequency: string;
  id: string;
  lastDayOfTheWeek: string;
  points: number;
  startDate: string;
  startTime: string;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
}
