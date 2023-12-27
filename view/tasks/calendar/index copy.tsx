// const [selectedDate, setSelectedDate] = useState<string | null>(null);

// const customDateRanges: CustomDateRange[] = [
//   { start: "2023-01-10", end: "2023-01-15" },
//   { start: "2023-02-05", end: "2023-02-10" },
//   // Add more date ranges as needed
// ];

// const isDateInRange = (date: string, range: CustomDateRange): boolean => {
//   const currentDate = new Date(date).getTime();
//   const startDate = new Date(range.start).getTime();
//   const endDate = new Date(range.end).getTime();
//   return currentDate >= startDate && currentDate <= endDate;
// };

// const dateCellRender = (value: dayjs.Dayjs): React.ReactNode => {
//   const dateString = value.format("YYYY-MM-DD");
//   const isInRange = customDateRanges.some((range) =>
//     isDateInRange(dateString, range)
//   );

//   return (
//     <div className={`custom-date-cell ${isInRange ? "highlighted" : ""}`}>
//       {value.date()}
//     </div>
//   );
// };
