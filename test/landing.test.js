import LandingPage from "../src/components/landingPage/LandingPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("LandingPage", () => {
  it("should have an title Videogames App", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const title = screen.getByText("Videogames App");
    expect(title).toBeInTheDocument();
  });
  it("should have a button Get Started", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const button = screen.getByText("Get Started");
    expect(button).toBeInTheDocument();
  });
});
