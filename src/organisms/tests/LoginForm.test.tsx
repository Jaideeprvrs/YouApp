import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { COLORS } from "../../constants/Colors";
import { STRINGS } from "../../constants/Strings";
import LoginForm from "../LoginForm";

const defaultProps = {
  name: "",
  email: "",
  setName: jest.fn(),
  setEmail: jest.fn(),
  handleOnClick: jest.fn(),
};

jest.mock("@gorhom/bottom-sheet", () => ({
  BottomSheetTextInput: "BottomSheetTextInput",
}));

jest.mock("../../atoms/ButtonComponent", () => "ButtonComponent");

jest.mock("../../constants/Strings", () => ({
  STRINGS: {
    GoogleSansMedium: "GoogleSansMedium",
    GoogleSansRegular: "GoogleSansRegular",
    loginDesc: "Please login to continue.",
    name: "Name",
    email: "Email",
    loginButtonText: "Log In",
    postDescPlaceholder: "What is on your mind?",
  },
}));

jest.mock("../../constants/Colors", () => ({
  COLORS: {
    white: "#ffffff",
    placeHolder: "#aaa",
    inputBorder: "#ccc",
    black: "#000",
    disableButton: "#999",
  },
}));

describe("LoginForm Component Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders name input, email input, login description, and button", () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByText(STRINGS.loginDesc)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(STRINGS.name)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(STRINGS.email)).toBeOnTheScreen();
    expect(screen.getByText(STRINGS.loginButtonText)).toBeOnTheScreen();
  });

  it("calls setName when the name input value changes", () => {
    render(<LoginForm {...defaultProps} />);
    const nameInput = screen.getByPlaceholderText(STRINGS.name);

    fireEvent.changeText(nameInput, "John Doe");

    expect(defaultProps.setName).toHaveBeenCalledTimes(1);
    expect(defaultProps.setName).toHaveBeenCalledWith("John Doe");
  });

  it("calls setEmail when the email input value changes", () => {
    render(<LoginForm {...defaultProps} />);
    const emailInput = screen.getByPlaceholderText(STRINGS.email);

    fireEvent.changeText(emailInput, "john@example.com");

    expect(defaultProps.setEmail).toHaveBeenCalledTimes(1);
    expect(defaultProps.setEmail).toHaveBeenCalledWith("john@example.com");
  });

  it("disables the login button if name or email is empty", () => {
    render(<LoginForm {...defaultProps} />);
    const loginButton = screen.getByText(STRINGS.loginButtonText);

    expect(loginButton.props.disable).toBe(true);
  });

  it("disables the login button if the email format is invalid", () => {
    const invalidProps = {
      ...defaultProps,
      name: "John Doe",
      email: "invalid-email",
    };
    render(<LoginForm {...invalidProps} />);
    const loginButton = screen.getByText(STRINGS.loginButtonText);

    expect(loginButton.props.disable).toBe(true);
  });

  it("enables the login button when both fields are filled and valid", () => {
    const validProps = {
      ...defaultProps,
      name: "John Doe",
      email: "john.doe@example.com",
    };
    render(<LoginForm {...validProps} />);
    const loginButton = screen.getByText(STRINGS.loginButtonText);

    expect(loginButton.props.disable).toBe(false);
  });

  it("calls handleOnClick when the valid button is pressed", () => {
    const validProps = {
      ...defaultProps,
      name: "John Doe",
      email: "john.doe@example.com",
    };
    render(<LoginForm {...validProps} />);
    const loginButton = screen.getByText(STRINGS.loginButtonText);

    loginButton.props.onClick();

    expect(validProps.handleOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct styling and maxLength to the name input", () => {
    render(<LoginForm {...defaultProps} />);
    const nameInput = screen.getByPlaceholderText(STRINGS.name);

    expect(nameInput.props.maxLength).toBe(20);
    expect(nameInput.props.placeholderTextColor).toBe(COLORS.placeHolder);
  });
});
