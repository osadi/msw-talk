import useSwr from "swr";

export const useCats = (url: string) => {
  const { data, error } = useSwr<Cat[]>(url);

  return {
    cats: data,
    isLoading: !error && !data,
    isError: error,
  };
};

type Cat = {
  id: string;
  tags: string[];
};
