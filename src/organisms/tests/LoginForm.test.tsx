import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { STRINGS } from "../../constants/Strings";
import LoginForm from "../LoginForm";

// Mock the child ButtonComponent and the BottomSheetTextInput from gorhom
jest.mock("../atoms/ButtonComponent", () => "ButtonComponent");
jest.mock("@gorhom/bottom-sheet", () => ({
  BottomSheetTextInput: jest.fn(({ onChangeText, value, ...props }) => (
    <input
      // Using an input mock allows us to simulate typing with fireEvent.changeText
      data-testid={props.placeholder} // Use placeholder as a test ID for easy retrieval
      onChange={(e) => onChangeText(e.target.value)}
      value={value}
      {...props}
    />
  )),
}));

describe("LoginForm", () => {
  const mockHandleClick = jest.fn();
  const mockSetName = jest.fn();
  const mockSetEmail = jest.fn();

  const baseProps = {
    name: "",
    email: "",
    setName: mockSetName,
    setEmail: mockSetEmail,
    handleOnClick: mockHandleClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all fields and text correctly", () => {
    render(<LoginForm {...baseProps} />);

    expect(screen.getByText(STRINGS.loginDesc)).toBeDefined();
    expect(screen.getByText(STRINGS.name)).toBeDefined();
    expect(screen.getByText(STRINGS.email)).toBeDefined();
    expect(screen.getByTestId(STRINGS.name)).toBeDefined(); // The mocked TextInput for name
    expect(screen.getByTestId(STRINGS.email)).toBeDefined(); // The mocked TextInput for email
    expect(screen.getByText("ButtonComponent")).toBeDefined(); // The mocked Button
  });

  it("calls setName when the name input changes", () => {
    render(<LoginForm {...baseProps} />);
    const nameInput = screen.getByTestId(STRINGS.name);

    fireEvent.changeText(nameInput, "John Doe");
    expect(mockSetName).toHaveBeenCalledWith("John Doe");
  });

  it("calls setEmail when the email input changes", () => {
    render(<LoginForm {...baseProps} />);
    const emailInput = screen.getByTestId(STRINGS.email);

    fireEvent.changeText(emailInput, "test@example.com");
    expect(mockSetEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("disables the button initially when fields are empty", () => {
    render(<LoginForm {...baseProps} />);
    const buttonComponent = screen.getByText("ButtonComponent");

    // We check the `disable` prop passed to the mocked component
    expect(buttonComponent.props.disable).toBe(true);
  });

  it("disables the button with a valid name but invalid email format", () => {
    const props = { ...baseProps, name: "John Doe", email: "invalid-email" };
    render(<LoginForm {...props} />);
    const buttonComponent = screen.getByText("ButtonComponent");

    expect(buttonComponent.props.disable).toBe(true);
  });

  it("disables the button with valid email but empty name", () => {
    const props = { ...baseProps, name: "", email: "valid@example.com" };
    render(<LoginForm {...props} />);
    const buttonComponent = screen.getByText("ButtonComponent");

    expect(buttonComponent.props.disable).toBe(true);
  });

  it("disables the button if either name or email is just whitespace", () => {
    // Name is just whitespace
    const props1 = { ...baseProps, name: "   ", email: "valid@example.com" };
    render(<LoginForm {...props1} />);
    expect(screen.getByText("ButtonComponent").props.disable).toBe(true);

    // Email is just whitespace
    const props2 = { ...baseProps, name: "Name", email: "   " };
    // Rerender with new props
    render(<LoginForm {...props2} />);
    expect(screen.getByText("ButtonComponent").props.disable).toBe(true);
  });

  it("enables the button when both name and email are valid", () => {
    const props = {
      ...baseProps,
      name: "John Doe",
      email: "valid@example.com",
    };
    render(<LoginForm {...props} />);
    const buttonComponent = screen.getByText("ButtonComponent");

    expect(buttonComponent.props.disable).toBe(false);
  });

  it("calls the handleOnClick function when the enabled button is pressed", () => {
    const props = {
      ...baseProps,
      name: "John Doe",
      email: "valid@example.com",
    };
    render(<LoginForm {...props} />);
    const buttonComponent = screen.getByText("ButtonComponent");

    // Simulate a press on the mocked button
    fireEvent.press(buttonComponent);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
