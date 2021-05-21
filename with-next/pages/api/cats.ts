import { NextApiResponse, NextApiRequest } from "next";

export const API_URL = "https://cataas.com/api/cats";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const searchParams = new URLSearchParams({
    tags: "cute"
  });

  const data = await fetch(`${API_URL}?${searchParams}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  const json = await data.json();
  return res.status(200).json(json);
};
