import { rest } from "msw";
import { API_URL, IMAGE_URL } from "../config";
/* eslint-disable-next-line */
import base64Image from "!url-loader!./nyancat.png";

export const catHandler = rest.get(API_URL, (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json([
      {
        id: "catId",
        created_at: "2015-11-06T18:36:54.148Z",
        tags: ["mockedTag1", "mockedTag2"]
      }
    ])
  )
);

export const catImgHandler = rest.get(
  `${IMAGE_URL}/:tag`,
  async (req, res, ctx) => {
    const imageBuffer = await fetch(base64Image).then((res) =>
      res.arrayBuffer()
    );

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/png"),
      ctx.body(imageBuffer)
    );
  }
);

export const handlers = [catImgHandler, catHandler];
