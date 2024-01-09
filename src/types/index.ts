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
  CHARITY = "charity",
}
export enum FormInputType {
  SEARCH = "search",
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  DATE = "date",
  TIME = "time",
  MONTH = "month",
  WEEK = "week",
  NUMBER = "number",
}

export interface TaskAnalytics {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  todaysTaskCount: number;
}

export interface GetTasksQuery {
  query: string;
  status: TaskStatus;
  type: TaskType;
}

export interface GetTask {
  id?: string;
  category?: CategoryType | null;
  categoryId?: string | null;
  endDate: string | null;
  endTime: string | null;
  firstDayOfTheWeek: string | null;
  frequency: TaskFrequency;
  secondDayOfTheWeek: string | null;
  points: number;
  startDate: string | null;
  startTime: string | null;
  status: TaskStatus;
  title: string;
  type: TaskType;
  dayOfTheMonth: string | null;
  groupId?: string;
}

export interface DataAnalyticsTypes {
  [key: string]: any;
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
  id: string;
  creatorId: string;
  title: string;
  type: TypeCategory;
}

export interface CharitiesType {
  id?: string;
  organizationName: string;
  amount: number;
  category?: CategoryType | null;
  categoryId?: string | null;
  createdAt?: string | null;
  date?: string | null;
}

export interface UserDetails {
  id: string;
  roles: string;
  name: string;
  email: string;
  profilePicUrl: string;
}

export interface GetEventType {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  eventLink: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;
  points: number;
  recurringStatus: boolean;
  backgroundImageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UpdateEventType extends Partial<GetEventType> {}

export interface UpdateCharityType extends CharitiesType {
  id: string;
}

export interface AnalyticsGraphData {
  months: string[];
  amount: string[];
}
export interface GetAnalyticsGraphDataTypes {
  revenueEarnedGraph: AnalyticsGraphData;
  costPerLeadGraph: AnalyticsGraphData;
  adSpendsGraph: AnalyticsGraphData;
  adSpendsReturnGraph: AnalyticsGraphData;
  vipGroupSizeGraph: AnalyticsGraphData;
  totalPaidCustomerGraph: AnalyticsGraphData;
}

export interface HabitType {
  id?: string;
  creatorId?: string;
  title: string;
  points: number;

  habitSubmit: HabitSubmissionType;
}

export interface HabitSubmissionType {
  id?: string;
  userId?: string;
  creatorId: string;
  deletedAt?: string;
  createdAt?: string;

  habitId: string;
  habitTitle: string;
  habitPoints: number;
}

export interface Badge {
  id: string;
  creatorId: string;
  badgeId: string;
}

export interface Option {
  id: string;
  text: string;
  submissions: QuizSubmission[];
  isCorrect: boolean;
}

export interface QuizSubmission {
  id: string;
  score: number;
  selectedOption: Option;
}

export interface Question {
  id: string;
  creatorId?: string;
  quizId?: string;
  text: string;
  options: Option[];
  points: number;
  imageUrl?: string;
  submissions?: QuizSubmission[];
}

export interface Quiz {
  id: string;
  creatorId: string;
  name: string;
  badges: Badge[];
  points: number;
  questions: Question[];
  createdAt?: Date;
  submissions: QuizSubmission[];
}

export interface UserDegree {
  id: string;
  creatorId: string;
  title: string;
  degreeLink: string;
  description: string;
  thumbnailUrl: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface UserAchievement {
  id: string;
  creatorId: string;
  title: string;
  achievementLink?: string;
  description: string;
  thumbnailUrl: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface EventData {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  eventLink: string;
  location?: string | null;
  startDate: string | Date | number | null;
  endDate: string | Date | number | null;
  startTime: string | Date | number | null;
  endTime: string | Date | number | null;
  points?: string | null;
  recurringStatus: boolean;
  backgroundImageUrl: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  badges?: Array<Object> | null;
}

export interface CreatorAllUsersTasks {
  id: string;
  name: string;
  completed: number;
  pending: number;
}

export interface CreatorsUserTasks {
  id: string;
  name: string;
  completed: number;
  pending: number;
  tasks: [
    {
      id: string;
      groupId: string;
      userName: string;
      userId: string;
      userCreatorId: string;
      title: string;
      type: string;
      points: number;
      startDate: string | Date;
      endDate?: string | Date | null;
      startTime: string | Date;
      endTime: string | Date | null;
      status: string;
      frequency: string;
      firstDayOfTheWeek?: string | null;
      secondDayOfTheWeek?: string | null;
      dayOfTheMonth?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      deletedAt?: string | null;
      category: {
        id: string;
        creatorId: string;
        title: string;
        type: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        deletedAt?: string | null;
      };
    }
  ];
}

export interface CreatorCharitiesType {
  id: string;
  organizationName: string;
  userName?: string;
  amount: number;
  date: string;
  category: CategoryType | null;
}

export interface APIError {
  message?: string;
  error?: string;
  statusCode?: number;
}
