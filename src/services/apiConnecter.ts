
import axiosInstance from "./axiosInstance";
import { AxiosResponse, Method } from "axios";

export const apiConnector = async <T = any>(
  method: Method,
  url: string,
  body?: any,
  headers: Record<string, string> = {}
): Promise<AxiosResponse<T>> => {
  const isFormData = body instanceof FormData;

  return axiosInstance({
    method,
    url,
    ...(body !== undefined && { data: body }),
    headers: {
      ...headers,
      ...(isFormData ? {} : headers),
    },
  });
};
