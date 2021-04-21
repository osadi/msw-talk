import { NextApiResponse } from "next";

const API_URL =
  "https://catalog.goteborg.se/rowstore/dataset/cb541050-487e-4eea-b7b6-640d58f28092/json";

export default async (_, res: NextApiResponse) => {
  const searchParams = new URLSearchParams({
    date: new Date().toLocaleDateString("sv-SE"),
    station: "Femman",
    _limit: "10",
  });

  const data = await fetch(`${API_URL}?${searchParams}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await data.json();
  res.status(200).json(json);
};
