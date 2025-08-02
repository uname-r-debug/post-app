import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function post<D>(
  url: string,
  data: D,
  headers: AxiosRequestConfig<D>,
  resolve: (resolved: AxiosResponse<unknown, unknown>) => void,
  reject: (rejected: unknown) => void,
) {
  axios.post(url, data, headers).then(resolve).catch(reject);
}
