import { useEffect, useState } from "react";

export const useGHQuery = <Data, Variables>({
  query,
  variables
}: {
  query: string;
  variables: Variables;
}) => {
  const [state, setState] = useState<Data | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query,
        variables
      }),
      signal
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if ("error" in data) {
          throw new Error(data.error);
        }
        return data;
      })
      .then(({ user }) => setState(user))
      .catch((e) => {
        if (signal.aborted) {
          console.log("Aborted");
        } else {
          setState(null);
          console.error(e);
        }
      });

    return () => controller.abort();
  }, [query, variables]);

  return state;
};
