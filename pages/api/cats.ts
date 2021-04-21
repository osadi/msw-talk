import { NextApiResponse } from "next";

const API_URL = "https://cataas.com/api/cats";

export default async (_, res: NextApiResponse) => {
  const searchParams = new URLSearchParams({
    tags: "cute",
  });

  const data = await fetch(`${API_URL}?${searchParams}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await data.json();
  res.status(200).json(json);
};
