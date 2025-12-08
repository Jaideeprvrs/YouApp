import { act, render } from "@testing-library/react-native";
import React from "react";
import AnimatedText from "../AnimatedText"; // adjust path

jest.useFakeTimers();

describe("AnimatedText Component", () => {
  it("renders empty initially", () => {
    const { getByText } = render(<AnimatedText text="Hello" speed={50} />);
    expect(getByText("")).toBeTruthy();
  });

  it("animates text one character at a time", () => {
    const { getByText, rerender } = render(
      <AnimatedText text="Hi" speed={100} />
    );

    // After 1 tick
    act(() => jest.advanceTimersByTime(100));
    expect(getByText("H")).toBeTruthy();

    // After 2 ticks
    act(() => jest.advanceTimersByTime(100));
    expect(getByText("Hi")).toBeTruthy();
  });

  it("stops animation when full text displayed", () => {
    render(<AnimatedText text="ABC" speed={100} />);

    act(() => jest.advanceTimersByTime(300));

    // All timers should be cleared
    expect(clearInterval).toHaveBeenCalled();
  });

  it("restarts animation when text changes", () => {
    const { getByText, rerender } = render(
      <AnimatedText text="Hey" speed={100} />
    );

    act(() => jest.advanceTimersByTime(300));
    expect(getByText("Hey")).toBeTruthy();

    // Change text
    rerender(<AnimatedText text="Yo" speed={100} />);

    // Should reset and start again
    act(() => jest.advanceTimersByTime(100));
    expect(getByText("Y")).toBeTruthy();

    act(() => jest.advanceTimersByTime(100));
    expect(getByText("Yo")).toBeTruthy();
  });

  it("clears interval on unmount", () => {
    const { unmount } = render(<AnimatedText text="Bye" speed={100} />);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
