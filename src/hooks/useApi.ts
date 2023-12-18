import { setLoading } from "@/redux/reducers/loader.reducer";
import { GetTask, IFetchAPICall } from "@/types/fetchCall";
import { useAppDispatch } from "./useRedux";

const useAPI = () => {
  const dispatch = useAppDispatch();

  const http = async (path: string, options?: IFetchAPICall) => {
    console.log(options);
    dispatch(setLoading(true));
    const token =
      localStorage.getItem("token") ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmMyZTYzODQzMDUxZGFkMTAyZjdiMyIsInJvbGVzIjpbImR1YWwiXSwiaWF0IjoxNzAyODgwMDMyLCJleHAiOjE3MDI5NjY0MzJ9.kRndDsVuq_o-Mxl-yNifgSaBu3yaJ3HATD3Zon7xdlU";
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path.replace(
      /^\/+/,
      ""
    )}`;
    try {
      console.log(url);
      const raw = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token ?? ""} `,
          "Content-Type": "application/json",
        },
        method: options?.method ?? "GET",
        body: options?.data ? JSON.stringify(options?.data) : undefined,
      });

      const data = await raw.json();
      return data;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const getTasks = (): Promise<GetTask[]> => {
    return http(`/tasks`, { method: "GET" });
  };
  //   const postUserFireNumbers = (data: IFireNumber) => {
  //     return http(`/fire-number`, { method: "POST", data });
  //   };
  //   const UpdateUserFireNumbers = ({ data }: { data: IFireNumber }) => {
  //     return http(`/fire-number`, { method: "PUT", data });
  //   };

  return {
    getTasks,
  };
};

export default useAPI;
