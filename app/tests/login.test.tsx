import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import Login from "../index";

jest.mock("@/src/screens/LoginScreen", () => "LoginScreen");
describe("Login Wrapper Component Unit Tests", () => {
  it("renders the LoginScreen child component", () => {
    render(<Login />);

    expect(screen.getByText("LoginScreen")).toBeOnTheScreen();
  });

  it("applies the correct flex style (flex: 1) to the container view", () => {
    render(<Login />);

    const containerView = screen.getByText("LoginScreen").parent;

    expect(containerView.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      })
    );
  });
});
