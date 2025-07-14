import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders input and shorten button", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText("Enter long URL")).toBeInTheDocument();
    expect(screen.getByText("Shorten URL")).toBeInTheDocument();
  });
});
