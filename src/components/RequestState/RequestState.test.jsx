import React from "react";
import { render, screen } from "@testing-library/react";
import RequestState from "./RequestState";

describe("RequestState", () => {
  it("renders the loading state copy", () => {
    render(<RequestState isLoading loadingText="Loading cast..." />);

    expect(screen.getByText("Loading cast...")).toBeInTheDocument();
    expect(
      screen.getByText("Pulling the latest data from the multiverse right now.")
    ).toBeInTheDocument();
  });

  it("renders an error state as an alert", () => {
    render(
      <RequestState
        error="API unavailable."
        errorTitle="Unable to load"
        isLoading={false}
      />
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Unable to load")).toBeInTheDocument();
    expect(screen.getByText("API unavailable.")).toBeInTheDocument();
  });

  it("renders the empty state when requested", () => {
    render(
      <RequestState
        emptyMessage="Try another filter."
        emptyTitle="Nothing here"
        isEmpty
      />
    );

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Try another filter.")).toBeInTheDocument();
  });
});
