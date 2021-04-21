import Page from "../pages/index";

import { render, screen } from "@testing-library/react";

describe("/pages/index.ts", () => {
  it("renders", () => {
    render(<Page />);
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });
});
