import { render, screen } from "@testing-library/react";
import { SWRConfig, cache } from "swr";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { handlers } from "../mocks/handlers";
import Cats from "../components/Cat";
import { API_URL } from "../config";

const server = setupServer(...handlers);
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

describe("Cats", () => {
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
      "GET: https://cataas.com/api/cats"
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
