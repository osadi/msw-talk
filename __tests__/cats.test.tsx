import Cats from "../pages/cats";
import { render, screen } from "@testing-library/react";
import { SWRConfig, cache } from "swr";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { catHandler } from "../mocks/handlers";
import getApiCatHandler, { API_URL } from "../pages/api/cats";
import { withHandler } from "../testHelpers";

export const getApiCatsHandler = rest.get(
  "http://localhost:3000/api/cats",
  withHandler(getApiCatHandler)
);

const server = setupServer(catHandler, getApiCatsHandler);
const handlerCalled = jest.fn();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
  server.on("request:start", (req) =>
    handlerCalled(`${req.method}: ${req.url.toString()}`)
  );
});

beforeEach(() => {
  handlerCalled.mockReset();
});

afterEach(() => {
  cache.clear();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("/pages/index.ts", () => {
  it("should fetch and show cats", async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Cats />
      </SWRConfig>
    );

    expect(screen.getByText("Loading cats...")).toBeInTheDocument();
    expect(await screen.findByText("catId")).toBeInTheDocument();
    expect(screen.getByText("mockedTag1")).toBeInTheDocument();
    expect(handlerCalled.mock.calls.flat()).toEqual([
      "GET: http://localhost:3000/api/cats",
      "GET: https://cataas.com/api/cats?tags=cute",
    ]);
  });

  it("should handle network errors", async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res.networkError("Failed to connect");
      })
    );

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Cats />
      </SWRConfig>
    );

    expect(screen.getByText("Loading cats...")).toBeInTheDocument();
    expect(await screen.findByText("Error")).toBeInTheDocument();
  });
});
