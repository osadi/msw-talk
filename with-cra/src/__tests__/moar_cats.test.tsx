import { render, screen } from "@testing-library/react";
import { SWRConfig, cache } from "swr";
import * as useCat from "../hooks/useCats";
import MoarCats from "../components/Cat";

jest.mock("../hooks/useCats");
const mockedUseCats = useCat as unknown as jest.Mocked<typeof useCat>;

beforeAll(() => {});

beforeEach(() => {});

afterEach(() => {
  cache.clear();
});

afterAll(() => {});

describe("/pages/index.ts", () => {
  it("renders moar cats", async () => {
    mockedUseCats.useCats.mockImplementationOnce(() => {
      return {
        cats: [],
        isLoading: true,
        isError: false
      };
    });

    const { rerender } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <MoarCats />
      </SWRConfig>
    );

    expect(screen.getByText("Loading cats...")).toBeInTheDocument();

    mockedUseCats.useCats.mockImplementationOnce(() => {
      return {
        cats: [{ id: "someid", tags: ["oneTag", "twoTag"] }],
        isLoading: false,
        isError: false
      };
    });

    rerender(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <MoarCats />
      </SWRConfig>
    );

    expect(await screen.findByText("oneTag")).toBeInTheDocument();
  });

  it("handles network errors", async () => {
    mockedUseCats.useCats.mockImplementationOnce(() => ({
      cats: [],
      isLoading: false,
      isError: true
    }));

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <MoarCats />
      </SWRConfig>
    );

    //expect(screen.getByText("Loading cats...")).toBeInTheDocument();
    expect(await screen.findByText("Error")).toBeInTheDocument();
  });
});
