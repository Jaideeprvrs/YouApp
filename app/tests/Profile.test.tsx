import { COLORS } from "@/src/constants/Colors";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import Profile from "../profile";

jest.mock("@/src/screens/ProfileScreen", () => "ProfileScreen");

jest.mock("@/src/constants/Colors", () => ({
  COLORS: {
    primary: "#007BFF",
  },
}));
describe("Profile Wrapper Component Unit Tests", () => {
  it("renders the ProfileScreen child component", () => {
    render(<Profile />);

    expect(screen.getByText("ProfileScreen")).toBeOnTheScreen();
  });

  it("applies the correct background color and flex styles to the container", () => {
    render(<Profile />);

    const containerView = screen.getByTestId("profile-container");

    expect(containerView.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
      })
    );
  });
});
