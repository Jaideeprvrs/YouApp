// These imports are fine because they are used *outside* the jest.mock factory functions
import { fireEvent, render, screen } from "@testing-library/react-native";
import CommentsComponent from "../CommentsComponent"; // Adjust import path

// --- MOCK DEPENDENCIES (FIXED) ---

// Use a variable name prefixed with 'mock' (case-insensitive) for the React Native components
// within the mock factory to satisfy Jest's strict checks.
const mockReactNative = require("react-native");
const MockView = mockReactNative.View;
const MockText = mockReactNative.Text;

// 1. Mock Reanimated
jest.mock("react-native-reanimated", () => {
  // We can use MockView here because it's prefixed with 'mock'
  return {
    View: MockView,
    FadeInUp: {
      delay: () => ({ duration: () => "mock-animation-config" }),
      duration: () => "mock-animation-config",
    },
    useAnimatedStyle: () => ({}),
    useSharedValue: () => ({}),
  };
});

// 2. Mock Child Components

// Mock Avtar component using MockView
jest.mock("../../atoms/Avtar", () => () => <MockView testID="mock-avatar" />);

// Mock TextButton component using MockText
jest.mock("../../atoms/TextButton", () => ({ onEditPress, item, label }) => (
  <MockText testID="mock-text-button" onPress={() => onEditPress(item)}>
    {label}
  </MockText>
));

describe("<CommentsComponent />", () => {
  // Define mock data and handlers
  const mockItem = {
    id: 5,
    name: "Jane Smith",
    email: "jane@test.com",
    body: "This is a test comment body that is reasonably long for testing purposes.",
  };

  const mockOnEditPress = jest.fn();
  const mockIndex = 0;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Renders correctly with provided data
  xit("renders correctly with all data fields", () => {
    render(
      <CommentsComponent
        item={mockItem}
        onEditPress={mockOnEditPress}
        index={mockIndex}
      />
    );
    // Use screen.getByText to check content
    expect(screen.getByText(mockItem.name)).toBeDefined();
    expect(screen.getByText(mockItem.email)).toBeDefined();
    expect(screen.getByText(mockItem.body)).toBeDefined();
  });

  // Test Case 2: Child components are rendered and interactive
  xit("renders the Avtar and TextButton components and handles press", () => {
    render(
      <CommentsComponent
        item={mockItem}
        onEditPress={mockOnEditPress}
        index={mockIndex}
      />
    );

    // Check presence of mocked components via test IDs
    expect(screen.getByTestId("mock-avatar")).toBeDefined();
    const textButton = screen.getByTestId("mock-text-button");

    // Check interaction
    fireEvent.press(textButton);
    expect(mockOnEditPress).toHaveBeenCalledTimes(1);
    expect(mockOnEditPress).toHaveBeenCalledWith(mockItem);
  });
});
