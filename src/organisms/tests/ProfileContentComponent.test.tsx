import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProfileContentComponent from "../ProfileContentComponent";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../molecules/ProfileHeader", () => "ProfileHeader");
jest.mock("../molecules/CustomTabSection", () => "CustomTabsSection");
jest.mock("./PostsSection", () => "PostsSection");
jest.mock("../molecules/AboutYouSection", () => "AboutYouSection");

const mockUseSelector = useSelector as jest.Mock;
const mockOpenSheet = jest.fn();

describe("ProfileContentComponent", () => {
  const baseProps = { openSheet: mockOpenSheet };
  const mockUserData = {
    name: "Jane Doe",
    email: "jane@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSelector.mockReturnValue({ userData: mockUserData });
  });

  it("renders ProfileHeader with user data", () => {
    render(<ProfileContentComponent {...baseProps} />);

    expect(screen.getByText("ProfileHeader")).toBeDefined();
    expect(screen.getByText("ProfileHeader").props.userName).toBe("Jane Doe");
    expect(screen.getByText("ProfileHeader").props.email).toBe(
      "jane@example.com"
    );
  });

  it("renders CustomTabsSection with correct tabs and initial index", () => {
    render(<ProfileContentComponent {...baseProps} />);

    expect(screen.getByText("CustomTabsSection")).toBeDefined();

    expect(screen.getByText("CustomTabsSection").props.tabs).toEqual([
      "Posts",
      "About YOU",
    ]);
    expect(screen.getByText("CustomTabsSection").props.initialIndex).toBe(0);
  });

  it("initially renders the PostsSection (index 0)", () => {
    render(<ProfileContentComponent {...baseProps} />);

    expect(screen.getByText("PostsSection")).toBeDefined();
    expect(screen.queryByText("AboutYouSection")).toBeNull();

    expect(screen.getByText("PostsSection").props.openSheet).toBe(
      mockOpenSheet
    );
  });

  it("switches to AboutYouSection when the tab index changes to 1", () => {
    render(<ProfileContentComponent {...baseProps} />);

    const customTabsSection = screen.getByText("CustomTabsSection");

    fireEvent(customTabsSection, "onChange", 1);

    expect(screen.getByText("AboutYouSection")).toBeDefined();
    expect(screen.queryByText("PostsSection")).toBeNull();
  });

  it("switches back to PostsSection when the tab index changes back to 0", () => {
    render(<ProfileContentComponent {...baseProps} />);

    const customTabsSection = screen.getByText("CustomTabsSection");

    fireEvent(customTabsSection, "onChange", 1);
    expect(screen.getByText("AboutYouSection")).toBeDefined();

    fireEvent(customTabsSection, "onChange", 0);
    expect(screen.getByText("PostsSection")).toBeDefined();
    expect(screen.queryByText("AboutYouSection")).toBeNull();
  });
});
