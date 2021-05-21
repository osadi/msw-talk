import useSwr from "swr";
import { API_URL } from "../config";

export type Cat = {
  id: string;
  tags: string[];
};

export const useCats = (tag = "") => {
  const { data, error } = useSwr<Cat[]>(`${API_URL}${tag ? `/${tag}` : ""}`);

  return {
    cats: data,
    isLoading: !error && !data,
    isError: error
  };
};
