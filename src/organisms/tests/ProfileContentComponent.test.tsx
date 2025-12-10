import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { useSelector as useSelectorMock } from "react-redux";
import ProfileContentComponent from "../ProfileContentComponent";

const defaultProps = {
  openSheet: jest.fn(),
};

const mockUserState = {
  userData: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
};

import { jest } from "@jest/globals";
import * as redux from "react-redux";

const useSelectorMock = jest.spyOn(redux, "useSelector");
const useDispatchMock = jest.spyOn(redux, "useDispatch");

jest.mock("../molecules/ProfileHeader", () => "ProfileHeader");
jest.mock("../molecules/CustomTabSection", () => "CustomTabsSection");
jest.mock("./PostsSection", () => "PostsSection");
jest.mock("../molecules/AboutYouSection", () => "AboutYouSection");

jest.mock("../constants/Strings", () => ({
  STRINGS: {
    GoogleSansMedium: "GoogleSansMedium",
  },
}));

jest.mock("../constants/Colors", () => ({
  COLORS: {
    white: "#ffffff",
  },
}));

describe("ProfileContentComponent Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useSelectorMock.mockReturnValue({
      authData: mockUserState,
    });
  });

  it("renders the ProfileHeader with name and email from Redux state", () => {
    render(<ProfileContentComponent {...defaultProps} />);

    const profileHeader = screen.getByText("ProfileHeader");

    expect(profileHeader.props.userName).toBe("Jane Doe");
    expect(profileHeader.props.email).toBe("jane.doe@example.com");
  });

  it("renders the CustomTabsSection with correct tabs and initial index", () => {
    render(<ProfileContentComponent {...defaultProps} />);

    const customTabsSection = screen.getByText("CustomTabsSection");

    expect(customTabsSection.props.tabs).toEqual(["Posts", "About YOU"]);
    expect(customTabsSection.props.initialIndex).toBe(0);
  });

  it("displays the PostsSection by default when tabIndex is 0", () => {
    render(<ProfileContentComponent {...defaultProps} />);

    expect(screen.getByText("PostsSection")).toBeOnTheScreen();
    expect(screen.queryByText("AboutYouSection")).toBeNull();

    const postsSection = screen.getByText("PostsSection");
    expect(postsSection.props.openSheet).toBe(defaultProps.openSheet);
  });

  it("switches content to AboutYouSection when the tab changes", () => {
    render(<ProfileContentComponent {...defaultProps} />);

    const customTabsSection = screen.getByText("CustomTabsSection");

    fireEvent(customTabsSection, "onChange", 1);

    expect(screen.getByText("AboutYouSection")).toBeOnTheScreen();
    expect(screen.queryByText("PostsSection")).toBeNull();
  });

  it("switches back to PostsSection when the tab changes back to 0", () => {
    render(<ProfileContentComponent {...defaultProps} />);

    const customTabsSection = screen.getByText("CustomTabsSection");

    fireEvent(customTabsSection, "onChange", 1);
    expect(screen.getByText("AboutYouSection")).toBeOnTheScreen();

    fireEvent(customTabsSection, "onChange", 0);

    expect(screen.getByText("PostsSection")).toBeOnTheScreen();
    expect(screen.queryByText("AboutYouSection")).toBeNull();
  });
});
