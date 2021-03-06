import { graphql, rest } from "msw";
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

const github = graphql.link("https://api.github.com/graphql");

export const ghUserGQL = github.query("User", (req, res, ctx) => {
  return res(
    ctx.data({
      user: {
        bio: "",
        company: "@gittub",
        name: "The Mocktocat",
        repositories: {
          nodes: [
            {
              name: "Hello-World"
            },
            {
              name: "Spoon-Knife"
            },
            {
              name: "download"
            },
            {
              name: "decompress"
            },
            {
              name: "bin-wrapper"
            }
          ]
        }
      }
    })
  );
});

export const handlers = [catImgHandler, catHandler, ghUserGQL];
