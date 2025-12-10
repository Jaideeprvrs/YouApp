import { COLORS } from "@/src/constants/Colors";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import Comments from "../comments";

jest.mock("@/src/screens/CommentsScreen", () => "CommentsScreen");

jest.mock("@/src/constants/Colors", () => ({
  COLORS: {
    primary: "#007BFF",
  },
}));
describe("Comments Wrapper Component Unit Tests", () => {
  it("renders the CommentsScreen child component", () => {
    render(<Comments />);

    expect(screen.getByText("CommentsScreen")).toBeOnTheScreen();
  });

  it("applies the correct background color and flex styles to the container", () => {
    render(<Comments />);

    const containerView = screen.getByTestId("comments-container");

    expect(containerView.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        backgroundColor: COLORS.primary,
      })
    );
  });
});
