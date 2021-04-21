import { rest } from "msw";
import { API_URL } from "../pages/api/cats";

export const catHandler = rest.get(API_URL, (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json([
      {
        id: "595f280a557291a9750ebf5f",
        created_at: "2015-11-06T18:36:54.148Z",
        tags: ["mockedTag1", "mockedTag2"],
      },
    ])
  )
);

export const handlers = [catHandler];
