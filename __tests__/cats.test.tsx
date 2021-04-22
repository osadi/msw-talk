import Cats from "../pages/cats";
import { render, screen } from "@testing-library/react";
import { SWRConfig, cache } from "swr";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { catHandler } from "../mocks/handlers";
import getApiCatHandler, { API_URL } from "../pages/api/cats";
import { withHandler } from "../testHelpers";

import { fetch } from "whatwg-fetch";
global.fetch = fetch;

export const getApiCats = rest.get(
  "http://localhost:3000/api/cats",
  withHandler(getApiCatHandler)
);

const server = setupServer(catHandler, getApiCats);
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
  it("renders mocked cats", async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Cats />
      </SWRConfig>
    );

    expect(screen.getByText("Loading cats...")).toBeInTheDocument();
    expect(await screen.findByText("mockedTag1")).toBeInTheDocument();
  });

  it("handles network errors", async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) =>
        res.networkError("Failed to connect")
      )
    );

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Cats />
      </SWRConfig>
    );

    expect(screen.getByText("Loading cats...")).toBeInTheDocument();
    expect(
      await screen.findByText("Error fetching cats...")
    ).toBeInTheDocument();
  });
});
