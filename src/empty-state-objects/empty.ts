import { GetTask } from "@/types/fetchCall";

export const emptyTask: GetTask = {
  category: null,

  endDate: null,
  endTime: null,
  firstDayOfTheWeek: "",
  frequency: "daily",

  lastDayOfTheWeek: "",
  points: 0,
  startDate: null,
  startTime: null,
  status: "pending",
  title: "",
  type: "one-time",
};
