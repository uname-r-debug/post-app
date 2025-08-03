import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formInputs(a: Array<string>): Array<string> {
  return a.map(id => document.querySelector<HTMLInputElement>('#' + id)!.value);
}
export function post<D, E>(
  url: string,
  data: D,
  headers: AxiosRequestConfig<D>,
  resolve: (resolved: AxiosResponse<E, unknown>) => void,
  reject: (rejected: unknown) => void,
) {
  axios.post(url, data, headers).then(resolve).catch(reject);
}
export const DEFAULT_POST_HEADERS: {
  headers: {
    "Content-Type": string;
    Accept: string;
  };
} = {
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
};
