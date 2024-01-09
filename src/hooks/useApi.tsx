import {
  APIError,
  CategoryType,
  CharitiesType,
  CreatorAllUsersTasks,
  CreatorCharitiesType,
  CreatorsUserTasks,
  DataAnalyticsTypes,
  EventData,
  GetAnalyticsGraphDataTypes,
  GetEventType,
  GetTask,
  GetTasksQuery,
  HabitSubmissionType,
  HabitType,
  IFetchAPICall,
  Quiz,
  TaskAnalytics,
  TaskStatus,
  UpdateCharityType,
  UserAchievement,
  UserDegree,
  UserDetails,
} from "@/types";
import { getCookie } from "cookies-next";

const useAPI = () => {
  const http = async (path: string, options?: IFetchAPICall) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path.replace(
      /^\/+/,
      ""
    )}`;

    const raw = await fetch(url, {
      headers: {
        Authorization: `Bearer  ${getCookie("token")} `,
        "Content-Type": "application/json",
      },
      method: options?.method ?? "GET",
      body: options?.data ? JSON.stringify(options?.data) : undefined,
    });

    const data = await raw.json();
    return data;
  };

  const getTasks = ({
    query,
    status,
    type,
    uniqueGroup,
  }: Partial<GetTasksQuery> & { uniqueGroup?: boolean }): Promise<
    GetTask[]
  > => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (status) params.append("status", status);
    if (type) params.append("type", type);
    if (uniqueGroup !== undefined)
      params.append("uniqueGroup", String(uniqueGroup));
    const queryString = params?.toString();
    const endPoint = `/tasks${queryString ? `?${queryString}` : ""}`;
    return http(endPoint, { method: "GET" });
  };

  // const getTodaysTasksWithUniqueGroupFalse = (): Promise<GetTask[]> => {
  //   return http("/tasks?uniqueGroup=false");
  // };

  const createTask = (data: Partial<GetTask>) => {
    return http("/tasks/create", { method: "POST", data });
  };

  const taskCounts = (): Promise<TaskAnalytics> => {
    return http("/tasks/count");
  };

  const getTodaysTasks = (): Promise<GetTask[]> => {
    return http("/tasks/today");
  };

  const getDataAnalytics = (): Promise<DataAnalyticsTypes[]> => {
    return http("/analytics");
  };

  const getCharitiesGraphData = ({
    startMonth,
    endMonth,
  }: {
    startMonth?: string;
    endMonth?: string;
  }): Promise<{
    months: string[];
    amount: string[];
  }> => {
    const params = new URLSearchParams();
    if (startMonth) params.append("startMonth", startMonth);
    if (endMonth) params.append("endMonth", endMonth);
    const queryString = params?.toString();
    const endPoint = `/charities/graph/track${
      queryString ? `?${queryString}` : ""
    }`;
    return http(endPoint, { method: "GET" });
  };

  const getCategories = ({
    type,
  }: {
    type: string;
  }): Promise<CategoryType[]> => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    const queryString = params?.toString();
    const endPoint = `/categories${queryString ? `?${queryString}` : ""}`;
    return http(endPoint);
  };

  const updateTaskStatus = (
    id: string,
    data: { status: TaskStatus }
  ): Promise<GetTask[]> => {
    return http(`/tasks/status/${id}`, { method: "PUT", data });
  };

  const deleteTask = (id?: string) => {
    return http(`/tasks/delete/${id}`, { method: "DELETE" });
  };

  const deleteAnalytic = (id?: string) => {
    return http(`/analytics/${id}`, { method: "DELETE" });
  };

  const createAnalytics = (data: Partial<DataAnalyticsTypes>) => {
    return http(`/analytics/create`, { method: "POST", data });
  };

  const createCharities = (data: CharitiesType) => {
    return http(`/charities/create`, { method: "POST", data });
  };

  const getCharities = ({
    query,
    createdAt,
  }: {
    query?: string;
    createdAt?: string;
  }): Promise<CharitiesType[]> => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (createdAt) params.append("createdAt", createdAt);
    const queryString = params?.toString();
    const endPoint = `/charities${queryString ? `?${queryString}` : ""}`;
    return http(endPoint, { method: "GET" });
  };

  const deleteCharity = (id: string) => {
    return http(`/charities/${id}`, { method: "DELETE" });
  };

  //   const postUserFireNumbers = (data: IFireNumber) => {
  //     return http(`/fire-number`, { method: "POST", data });
  //   };
  //   const UpdateUserFireNumbers = ({ data }: { data: IFireNumber }) => {
  //     return http(`/fire-number`, { method: "PUT", data });
  //   };

  const updateDataAnalytic = (
    id: string,
    data: Partial<DataAnalyticsTypes>
  ): Promise<DataAnalyticsTypes[]> => {
    return http(`/analytics/${id}`, { method: "PATCH", data });
  };

  const updateCharity = (
    id: string,
    data: Partial<UpdateCharityType>
  ): Promise<CharitiesType[]> => {
    return http(`/charities/${id}`, { method: "PATCH", data });
  };

  const getUserEvents = (): Promise<GetEventType[]> => {
    return http(`/events/user`);
  };

  const getTaskByGroupId = (groupId: string): Promise<GetTask> => {
    return http(`/tasks/${groupId}`);
  };

  const updateTaskByGroupId = (
    groupId: string,
    data: GetTask
  ): Promise<GetTask[]> => {
    return http(`/tasks/update/${groupId}`, { method: "PUT", data });
  };

  const getAnalyticsGraphData = (): Promise<GetAnalyticsGraphDataTypes> => {
    return http(`/analytics/track/graph`);
  };

  const getUserHabits = (): Promise<HabitType[]> => {
    return http(`/habits/user`);
  };

  const updateHabitStatusByUser = (
    data: HabitSubmissionType
  ): Promise<HabitSubmissionType> => {
    return http(`/habits-submission`, { method: "POST", data });
  };

  const removeUserHabit = (id: string) => {
    return http(`/habits-submission/${id}`, { method: "DELETE" });
  };

  const authenticateUser = (data: {
    token: string;
  }): Promise<{ jwtToken: string }> => {
    return http(`/auth/login`, { method: "POST", data });
  };

  const getUserDetails = (): Promise<UserDetails> => {
    return http(`/auth/user`);
  };

  const getUserQuizByQuizId = (quizId: string): Promise<Quiz> => {
    return http(`/quizzes/${quizId}`);
  };

  const getAllUserQuizzes = (): Promise<Quiz[]> => {
    return http(`/quizzes/user`);
  };

  const getUserDegrees = (): Promise<UserDegree[] | APIError> => {
    return http(`/degrees/user`);
  };

  const getCreatorDegrees = (): Promise<UserDegree[] | APIError> => {
    return http(`/degrees`);
  };

  const getCreatorDegreeById = (
    id?: string
  ): Promise<UserDegree | APIError> => {
    return http(`/degrees/${id}`);
  };

  const createDegree = (data: {
    title: string;
    degreeLink: string;
    description: string;
    thumbnailUrl: string;
  }): Promise<UserDegree | APIError> => {
    return http(`/degrees/create`, { method: "POST", data });
  };

  const updateDegree = (
    data: {
      title: string;
      degreeLink: string;
      description: string;
      thumbnailUrl: string;
    },
    id?: string | null
  ): Promise<UserDegree | APIError> => {
    return http(`/degrees/${id}`, { method: "PATCH", data });
  };

  const getUserAchievements = (): Promise<UserAchievement[] | APIError> => {
    return http(`/achievements/user`);
  };

  const getCreatorAchievements = (): Promise<UserAchievement[] | APIError> => {
    return http(`/achievements`);
  };

  const getCreatorAchievementById = (
    id?: string
  ): Promise<UserAchievement | APIError> => {
    return http(`/achievements/${id}`);
  };

  const createAchievement = (data: {
    title: string;
    description: string;
    thumbnailUrl: string;
  }): Promise<UserAchievement | APIError> => {
    return http(`/achievements/create`, { method: "POST", data });
  };

  const updateAchievement = (
    data: {
      title: string;
      description: string;
      thumbnailUrl: string;
    },
    id?: string | null
  ): Promise<UserAchievement | APIError> => {
    return http(`/achievements/${id}`, { method: "PATCH", data });
  };

  const deleteDegree = (id?: string) => {
    return http(`/degrees/${id}`, { method: "DELETE" });
  };

  const deleteAchievement = (id?: string) => {
    return http(`/achievements/${id}`, { method: "DELETE" });
  };

  const getCreatorEvents = ({
    startDate,
    endDate,
  }: {
    startDate?: string | undefined | null;
    endDate?: string | undefined | null;
  }): Promise<EventData | APIError> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const queryString = params?.toString();
    const endPoint = `/events${queryString ? `?${queryString}` : ""}`;
    return http(endPoint, { method: "GET" });
  };

  const getCreatorEventById = (id?: string): Promise<EventData | APIError> => {
    return http(`/events/${id}`);
  };

  const createSingleEvent = (data: {
    title: string;
    description: string;
    eventLink: string;
    startDate: string | Date | number | null;
    endDate: string | Date | number | null;
    startTime: string | Date | number | null;
    endTime: string | Date | number | null;
    recurringStatus?: boolean;
    backgroundImageUrl: string;
    badgeIds?: string[];
  }): Promise<EventData | APIError> => {
    return http(`/events/create`, { method: "POST", data });
  };

  const updateEvent = (
    data: {
      title: string;
      description: string;
      eventLink: string;
      startDate: string | Date | number | null;
      endDate: string | Date | number | null;
      startTime: string | Date | number | null;
      endTime: string | Date | number | null;
      recurringStatus?: boolean;
      backgroundImageUrl: string;
      badgeIds?: string[];
    },
    id?: string | null
  ): Promise<EventData | APIError> => {
    return http(`/events/update/${id}`, { method: "PATCH", data });
  };

  const deleteEvent = (id?: string) => {
    return http(`/events/${id}`, { method: "DELETE" });
  };

  const getCreatorTasks = (): Promise<CreatorAllUsersTasks[] | APIError> => {
    return http(`/tasks/creator`);
  };

  const getCreatorTaskByUserId = (
    id?: string
  ): Promise<CreatorsUserTasks | APIError> => {
    return http(`/tasks/creator/${id}`);
  };

  const getCreatorMyCharities = ({
    startDate,
    endDate,
  }: {
    startDate?: string | undefined | null;
    endDate?: string | undefined | null;
  }): Promise<CreatorCharitiesType[] | APIError> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const queryString = params?.toString();
    const endPoint = `/charities${queryString ? `?${queryString}` : ""}`;
    return http(endPoint, { method: "GET" });
  };

  const getCreatorUsersCharities = ({
    startDate,
    endDate,
  }: {
    startDate?: string | undefined | null;
    endDate?: string | undefined | null;
  }): Promise<CreatorCharitiesType[] | APIError> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const queryString = params?.toString();
    const endPoint = `/charities/users${queryString ? `?${queryString}` : ""}`;
    return http(endPoint, { method: "GET" });
  };

  const createQuiz = (data: { name: string }) => {
    return http(`/quizzes`, { method: "POST", data });
  };

  const getCreatorQuizzes = () => {
    return http("quizzes/creator");
  };

  const deleteQuizById = (quizId: string) => {
    return http(`quizzes/${quizId}`, { method: "DELETE" });
  };

  const createQuestion = (data: {
    imageUrl: string;
    quizId: string;
    text: string;
    points: number;
  }) => {
    return http(`questions`, { method: "POST", data });
  };

  const createMcqOption = (data: {
    questionId: string;
    text: string;
    isCorrect: boolean;
  }) => {
    return http(`mcq-options`, { method: "POST", data });
  };

  return {
    getTasks,
    createTask,
    taskCounts,
    getTodaysTasks,
    updateTaskStatus,
    deleteTask,
    getDataAnalytics,
    deleteAnalytic,
    createAnalytics,
    createCharities,
    getCharities,
    deleteCharity,
    getCategories,
    updateDataAnalytic,
    updateCharity,
    getUserEvents,
    getTaskByGroupId,
    updateTaskByGroupId,
    getCharitiesGraphData,
    getAnalyticsGraphData,
    getUserHabits,
    updateHabitStatusByUser,
    removeUserHabit,
    authenticateUser,
    getUserQuizByQuizId,
    getUserDetails,
    getAllUserQuizzes,
    getUserDegrees,
    getCreatorDegrees,
    createDegree,
    updateDegree,
    getUserAchievements,
    getCreatorAchievements,
    createAchievement,
    updateAchievement,
    deleteDegree,
    deleteAchievement,
    getCreatorDegreeById,
    getCreatorAchievementById,
    getCreatorEvents,
    deleteEvent,
    createSingleEvent,
    getCreatorEventById,
    updateEvent,
    getCreatorTasks,
    getCreatorTaskByUserId,
    getCreatorMyCharities,
    getCreatorUsersCharities,
    createQuiz,
    getCreatorQuizzes,
    deleteQuizById,
    createQuestion,
    createMcqOption,
  };
};

export default useAPI;
