import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AboutYouSection from "../AboutYouSection.tsx"; // Adjust the import path

// --- 1. Mock Redux Dependencies ---
const mockStore = configureStore([]);
// Mock the logout action creator
const mockLogout = jest.fn();
jest.mock("../../redux/slices/authSlice", () => ({
  logout: () => mockLogout(),
}));
// A simple mock of your date utility to return a consistent string
jest.mock("../../utils/dateConversion", () => ({
  dateConversion: () => ({
    formatDate: jest.fn((dateString) => `Formatted: ${dateString}`),
  }),
}));

// --- 2. Mock Expo Router ---
const mockRouterPush = jest.fn();
jest.mock("expo-router", () => ({
  router: {
    push: (path) => mockRouterPush(path),
  },
}));

describe("<AboutYouSection />", () => {
  // Define a consistent mock initial state for the Redux store
  const initialState = {
    authData: {
      userData: {
        name: "Jane Doe",
        email: "jane@example.com",
        createdAt: "2023-01-15T10:00:00Z",
      },
    },
  };

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    // Clear all mocks before each test
    mockLogout.mockClear();
    mockRouterPush.mockClear();
  });

  // A helper function to render the component wrapped in the mocked Redux Provider
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <AboutYouSection />
      </Provider>
    );

  // Test Case 1: Renders correctly with user data (Snapshot Test)
  it("renders user information correctly", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test Case 2: Displays user name, email, and formatted join date
  it("displays name, email, and formatted date from the store", () => {
    renderComponent();

    // Use screen.getByText to find the dynamic data displayed
    expect(screen.getByText("Jane Doe")).toBeDefined();
    expect(screen.getByText("jane@example.com")).toBeDefined();
    // Verify the date utility mock is working as expected
    expect(screen.getByText("Formatted: 2023-01-15T10:00:00Z")).toBeDefined();
  });

  // Test Case 3: The "Log Out" button dispatches the logout action and navigates
  xit("logs out the user and navigates to the index page when pressed", () => {
    renderComponent();

    // Find the "Log Out" button via its text label
    const logoutButton = screen.getByText("Log Out");

    // Simulate a press event
    fireEvent.press(logoutButton);

    // Verify that the logout action was dispatched
    expect(mockLogout).toHaveBeenCalledTimes(1);

    // Verify that the router navigated to the correct path
    expect(mockRouterPush).toHaveBeenCalledWith("/index");
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
  });
});
