import dayjs from "dayjs";

export const dateToISOString = (dateString: string) => {
  return dayjs(dateString).toISOString();
};

export const daysArray = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const daysOfMonthArray = Array.from({ length: 31 }, (_, index) => index + 1);

export const daysOfMonthDropdown = daysOfMonthArray.map((day) => ({
  label: day.toString(),
  value: day.toString(),
}));
