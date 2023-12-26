import {
  CategoryType,
  CharitiesType,
  DataAnalyticsTypes,
  GetEventType,
  GetTask,
  GetTasksQuery,
  IFetchAPICall,
  TaskAnalytics,
  TaskStatus,
  UpdateCharityType,
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
  }: Partial<GetTasksQuery>): Promise<GetTask[]> => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (status) params.append("status", status);
    if (type) params.append("type", type);
    const queryString = params.toString();
    const endPoint = `/tasks${queryString ? `?${queryString}` : ""}`;
    return http(endPoint, { method: "GET" });
  };

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

  const getCategories = ({
    type,
  }: {
    type: string;
  }): Promise<CategoryType[]> => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    const queryString = params.toString();
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
    const queryString = params.toString();
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
  };
};

export default useAPI;
