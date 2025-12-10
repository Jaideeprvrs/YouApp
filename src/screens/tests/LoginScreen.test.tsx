import { act, render, screen } from "@testing-library/react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { STRINGS } from "../../constants/Strings";
import { loginSuccess } from "../../redux/slices/authSlice";
import LoginScreen from "../LoginScreen";

import { jest } from "@jest/globals";
import * as redux from "react-redux";

const mockRouterPush = jest.fn();
jest.mock("expo-router", () => ({
  router: {
    push: mockRouterPush,
  },
  useLocalSearchParams: jest.fn(),
}));

const useDispatchMock = jest.spyOn(redux, "useDispatch");

jest.mock("../molecules/AnimatedLoginText", () => "AnimatedLoginText");
jest.mock("../organisms/CustomBottomSheet", () => "CustomBottomSheet");
jest.mock("../organisms/LoginForm", () => "LoginForm");

jest.mock("@gorhom/bottom-sheet", () => ({
  BottomSheet: "BottomSheet",
  // Mock other named exports if needed
}));

jest.mock("../constants/Strings", () => ({
  STRINGS: {
    you: "You",
    CedarvilleCursiveRegular: "CedarvilleCursiveRegular",
  },
}));

describe("LoginScreen Unit Tests", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("renders AnimatedLoginText, CustomBottomSheet, and LoginForm", () => {
    render(<LoginScreen />);

    expect(screen.getByText("AnimatedLoginText")).toBeOnTheScreen();
    expect(screen.getByText("CustomBottomSheet")).toBeOnTheScreen();
    expect(screen.getByText("LoginForm")).toBeOnTheScreen();
    expect(screen.getByText("AnimatedLoginText").props.text).toBe(STRINGS.you);
  });

  it("passes initial empty state to LoginForm", () => {
    render(<LoginScreen />);
    const loginForm = screen.getByText("LoginForm");

    expect(loginForm.props.name).toBe("");
    expect(loginForm.props.email).toBe("");
  });

  it("handles login click by dispatching loginSuccess and navigating to posts screen", async () => {
    render(<LoginScreen />);
    const loginForm = screen.getByText("LoginForm");

    act(() => {
      loginForm.props.setName("TestUser");
      loginForm.props.setEmail("test@example.com");
    });

    loginForm.props.handleOnClick();

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: "/posts",
      params: { userName: "TestUser" },
    });

    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction.type).toBe(loginSuccess.type);
    expect(dispatchedAction.payload.name).toBe("TestUser");
    expect(dispatchedAction.payload.email).toBe("test@example.com");
    expect(dispatchedAction.payload.isLoggedIn).toBe(true);
  });
});
