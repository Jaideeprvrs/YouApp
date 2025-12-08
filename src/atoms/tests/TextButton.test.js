import { fireEvent, render, screen } from "@testing-library/react-native";
import TextButton from "../TextButton"; // Adjust import path

// Mock any external constants if your testing environment requires it.

describe("<TextButton />", () => {
  // Define some mock data to use throughout the tests
  const mockItemData = { id: 123, name: "Test Item" };

  // Create a mock function to track the press events
  const mockOnEditPress = jest.fn();

  beforeEach(() => {
    // Reset the mock function's call count before each test runs
    mockOnEditPress.mockClear();
  });

  // Test Case 1: Renders correctly with default props (Snapshot Test)
  it("renders correctly", () => {
    const tree = render(
      <TextButton
        onEditPress={mockOnEditPress}
        item={mockItemData}
        label="Edit"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test Case 2: Displays the correct label text
  it("displays the correct label text", () => {
    const labelText = "Click Here to Edit";
    render(
      <TextButton
        onEditPress={mockOnEditPress}
        item={mockItemData}
        label={labelText}
      />
    );

    // Use getByText to find the component by its display text
    const buttonTextElement = screen.getByText(labelText);
    expect(buttonTextElement).toBeDefined();
  });

  // Test Case 3: Calls the onEditPress handler with the correct item data when pressed
  it("calls the onEditPress handler with the item prop when pressed", () => {
    render(
      <TextButton
        onEditPress={mockOnEditPress}
        item={mockItemData}
        label="Edit Item"
      />
    );

    // Find the touchable element (the parent of the Text component)
    // We select the Text and then get its parent which is the TouchableOpacity
    const buttonTouchable = screen.getByText("Edit Item").parent;

    // Simulate a user press event
    fireEvent.press(buttonTouchable);

    // Assert that the mock function was called exactly once
    expect(mockOnEditPress).toHaveBeenCalledTimes(1);

    // Assert that the mock function was called with the specific mockItemData object
    expect(mockOnEditPress).toHaveBeenCalledWith(mockItemData);
  });
});
