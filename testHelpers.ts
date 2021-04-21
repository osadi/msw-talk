import { MockedRequest, ResponseComposition } from "msw";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * The request and response object differs in MSW and Next.
 * This handler formats the object to the Next format which
 * enables us to run our actual API handler in unit tests.
 */
export const handler = (req: MockedRequest, res: ResponseComposition) => {
  const headers = req.headers.all;
  const result = { status: 500, data: undefined };
  const { searchParams } = req.url;
  const query: Record<string, unknown> = {};
  searchParams.forEach((v, k) => {
    query[k] = v;
  });
  return async (handler: NextApiHandler) => {
    void (await handler(
      ({ ...req, headers, query } as unknown) as NextApiRequest,
      ({
        ...res,
        setHeader: () => {},
        status: (statusCode: number) => {
          result.status = statusCode;
          return {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'json' implicitly has an 'any' type.
            json: (json) => {
              result.data = json;
            },
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
            send: (data) => {
              result.data = data;
            },
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
            end: (data) => {
              result.data = data;
            },
          };
        },
      } as unknown) as NextApiResponse
    ));
    return result;
  };
};

export const withHandler = (
  handlerFunc: NextApiHandler,
  headers?: [string, string][],
  reqOverride?: Record<string, unknown>
) => async (req: any, res: any, ctx: any) => {
  headers?.forEach(([name, value]) => req.headers.set(name, value));
  const { status, data } = await handler(
    { ...req, ...reqOverride },
    res
  )(handlerFunc);
  return res(ctx.status(status), ctx.json(data));
};
