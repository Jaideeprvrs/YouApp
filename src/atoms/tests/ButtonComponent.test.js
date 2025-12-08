import { fireEvent, render, screen } from "@testing-library/react-native";
import ButtonComponent from "../ButtonComponent"; // Adjust import path

// Mock any constants or external libraries if necessary.
// For this simple component, mocking is minimal.
// We can assume COLORS and STRINGS are defined elsewhere in the project setup.

describe("<ButtonComponent />", () => {
  // Test Case 1: Renders correctly with default props (Snapshot Test)
  it("renders correctly", () => {
    const mockOnClick = jest.fn();
    const tree = render(
      <ButtonComponent onClick={mockOnClick} label="Click Me" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test Case 2: Renders the correct label text
  it("displays the correct label text", () => {
    const labelText = "Submit Form";
    render(<ButtonComponent onClick={() => {}} label={labelText} />);
    // Use getByText to find the component by its display text
    const buttonTextElement = screen.getByText(labelText);
    expect(buttonTextElement).toBeDefined();
  });

  // Test Case 3: Calls the onClick handler when pressed
  it("calls the onClick handler when the button is pressed", () => {
    // Create a mock function to track calls
    const mockOnClick = jest.fn();
    render(<ButtonComponent onClick={mockOnClick} label="Pressable Button" />);

    // Find the button element by its text label and fire a press event
    const button = screen.getByText("Pressable Button").parent; // Get the TouchableOpacity wrapper

    fireEvent.press(button);

    // Assert that the mock function was called exactly once
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
