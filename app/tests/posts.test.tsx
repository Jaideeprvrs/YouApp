import { COLORS } from "@/src/constants/Colors";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import Posts from "../posts";

jest.mock("@/src/screens/PostsScreen", () => "PostsScreen");

jest.mock("@/src/constants/Colors", () => ({
  COLORS: {
    primary: "#007BFF",
  },
}));
describe("Posts Wrapper Component Unit Tests", () => {
  it("renders the PostsScreen child component", () => {
    render(<Posts />);

    expect(screen.getByText("PostsScreen")).toBeOnTheScreen();
  });

  it("applies the correct background color and flex styles to the container", () => {
    render(<Posts />);

    const containerView = screen.getByTestId("posts-container");

    expect(containerView.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        backgroundColor: COLORS.primary,
      })
    );
  });
});
