import { jest } from "@jest/globals";
import * as NetInfo from "@react-native-community/netinfo";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";
import { STRINGS } from "../../constants/Strings";
import { useGetPostsQuery } from "../../redux/slices/postsApi";
import { useUserServices } from "../../services/userService";
import PostsScreen from "../PostsScreen"; // Adjust import path

// --- Mocks ---
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));
jest.mock("../redux/slices/postsApi", () => ({
  useGetPostsQuery: jest.fn(),
}));
jest.mock("../services/userService", () => ({
  useUserServices: jest.fn(),
}));
jest.mock("../atoms/InternetStatus", () => "InternetStatus");
jest.mock("../molecules/ErrorComponent", () => "ErrorComponent");
jest.mock(
  "../molecules/MemoizedDetailsComponent",
  () => "MemoizedDetailsComponent"
);
jest.mock("../organisms/CreatePosts", () => "CreatePosts");
jest.mock("../organisms/CustomBottomSheet", () => "CustomBottomSheet");

jest.mock("@gorhom/bottom-sheet", () => ({
  BottomSheet: "BottomSheet",
}));

jest.mock("react-native/Libraries/Lists/FlatList", () => {
  const React = require("react");
  const MockFlatList = (props: any) => {
    return (
      <React.View testID="mock-flatlist">
        {props.ListHeaderComponent && (
          <React.View testID="header-component">
            {props.ListHeaderComponent()}
          </React.View>
        )}
        {props.data?.map((item: any, index: number) =>
          props.renderItem({ item, index })
        )}
      </React.View>
    );
  };
  return MockFlatList;
});

const mockNetInfo = {
  isConnected: true,
  type: NetInfo.NetInfoStateType.WIFI,
  details: null,
  isInternetReachable: true,
};

export const useNetInfo = jest.fn(() => mockNetInfo);

export const setIsConnected = (state: boolean) => {
  mockNetInfo.isConnected = state;
};

export default {
  useNetInfo,
  fetch: jest.fn(() => Promise.resolve(mockNetInfo)),
  addEventListener: jest.fn(() => () => {}),
  removeEventListener: jest.fn(),
};

const mockUserData = {
  name: "TestUser",
  email: "test@example.com",
};
const mockPostsData = [
  { id: 1, title: "Post 1 Title", body: "Post 1 Body", userId: 1 },
  { id: 2, title: "Post 2 Title", body: "Post 2 Body", userId: 1 },
];

describe("PostsScreen Unit Tests", () => {
  let mockRefetch: jest.Mock;
  let mockHandleCreatePost: jest.Mock;
  let mockBottomSheetRef: React.MutableRefObject<any>;

  beforeEach(() => {
    jest.clearAndRestoreMocks();
    setIsConnected(true);
    mockRefetch = jest.fn();
    mockHandleCreatePost = jest.fn().mockResolvedValue({ success: true });

    mockBottomSheetRef = { current: { expand: jest.fn(), close: jest.fn() } };
    jest.spyOn(React, "useRef").mockReturnValue(mockBottomSheetRef);

    (useSelector as jest.Mock).mockReturnValue({
      authData: { userData: mockUserData },
    });

    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: mockPostsData,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: mockRefetch,
    });

    (useUserServices as jest.Mock).mockReturnValue({
      handleCreatePost: mockHandleCreatePost,
      isLoading: false,
      isSuccess: false,
    });
  });

  it("renders ActivityIndicator when initially loading", () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
      data: undefined,
      error: undefined,
      refetch: mockRefetch,
    });
    render(<PostsScreen />);
    expect(screen.getByTestId("activity-indicator")).toBeOnTheScreen();
  });

  it("renders ErrorComponent when API error occurs and no data is cached", () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: undefined,
      error: true,
      refetch: mockRefetch,
    });
    render(<PostsScreen />);
    expect(screen.getByText("ErrorComponent")).toBeOnTheScreen();
    expect(screen.getByText("ErrorComponent").props.title).toBe(
      STRINGS.errorTitle
    );
  });

  it("renders the main UI with CreatePosts header and list of posts upon success", () => {
    render(<PostsScreen />);

    expect(screen.getByTestId("mock-flatlist")).toBeOnTheScreen();
    expect(screen.getByTestId("header-component")).toBeOnTheScreen();
    expect(screen.getAllByText("MemoizedDetailsComponent")).toHaveLength(2);
    expect(screen.queryByText("ErrorComponent")).toBeNull();
  });

  it("displays InternetStatus when offline", async () => {
    render(<PostsScreen />);
    expect(screen.queryByText("InternetStatus")).toBeNull();

    act(() => {
      setIsConnected(false);
    });

    await waitFor(() => {
      expect(screen.getByText("InternetStatus")).toBeOnTheScreen();
    });
  });

  it("navigates to comments screen with correct params when a post item is clicked", () => {
    render(<PostsScreen />);
    const firstPostComponent = screen.getAllByText(
      "MemoizedDetailsComponent"
    )[0];

    fireEvent(firstPostComponent, "handlePress", mockPostsData[0]);

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/comments",
      params: {
        postId: 1,
        postName: "Post 1 Title",
        postBody: "Post 1 Body",
      },
    });
  });

  it("opens the bottom sheet when the header component triggers openSheet", () => {
    render(<PostsScreen />);
    const headerComponent = screen.getByText("CreatePosts");

    headerComponent.props.openSheet();

    expect(mockBottomSheetRef.current.expand).toHaveBeenCalledTimes(1);
  });

  it("handles post creation correctly: calls API, refetches, and closes sheet", async () => {
    render(<PostsScreen />);

    const bottomSheetCreatePosts = screen.getAllByText("CreatePosts")[1];

    act(() => {
      bottomSheetCreatePosts.props.setPost("New post body");
      bottomSheetCreatePosts.props.setPostTitle("New post title");
    });

    await act(async () => {
      await bottomSheetCreatePosts.props.sendPost();
    });

    expect(mockHandleCreatePost).toHaveBeenCalledTimes(1);
    expect(mockHandleCreatePost).toHaveBeenCalledWith({
      post: "New post body",
      postTitle: "New post title",
    });

    expect(mockRefetch).toHaveBeenCalledTimes(1);
    expect(mockBottomSheetRef.current.close).toHaveBeenCalledTimes(1);
  });
});
