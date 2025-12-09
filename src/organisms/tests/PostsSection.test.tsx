import { render, screen } from "@testing-library/react-native";
import React from "react";
import { useSelector } from "react-redux";
import { STRINGS } from "../../constants/Strings";
import PostsSection from "../PostsSection";

// --- Mocks ---

// Mock react-redux useSelector hook
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../molecules/DetailsComponent", () => "DetailsComponent");
jest.mock("../molecules/NoPostsComponent", () => "NoPostsComponent");

jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  return {
    ...RN,
    FlatList: jest.fn((props) => {
      return (
        <RN.View testID="mock-flat-list">
          {props.data.map((item, index) => props.renderItem({ item, index }))}
        </RN.View>
      );
    }),
  };
});

const mockUseSelector = useSelector as jest.Mock;
const mockOpenSheet = jest.fn();

describe("PostsSection", () => {
  const baseProps = { openSheet: mockOpenSheet };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders NoPostsComponent when there are no posts", () => {
    mockUseSelector.mockReturnValue({ createdPosts: [] });

    render(<PostsSection {...baseProps} />);

    expect(screen.getByText("NoPostsComponent")).toBeDefined();
    expect(screen.getByText("NoPostsComponent").props.message).toBe(
      STRINGS.noPostsdesc
    );
    expect(screen.getByText("NoPostsComponent").props.title).toBe(
      STRINGS.noPostsTitle
    );
    expect(screen.getByText("NoPostsComponent").props.onClickText).toBe(
      STRINGS.createPost
    );

    expect(screen.queryByTestId("mock-flat-list")).toBeNull();
  });

  it("renders NoPostsComponent when createdPosts is null/undefined", () => {
    mockUseSelector.mockReturnValue({ createdPosts: null });

    render(<PostsSection {...baseProps} />);

    expect(screen.getByText("NoPostsComponent")).toBeDefined();

    expect(screen.queryByTestId("mock-flat-list")).toBeNull();
  });

  it("renders FlatList and post items when posts exist", () => {
    const mockPosts = [
      { title: "Post Title 1", body: "Post Body 1" },
      { title: "Post Title 2", body: "Post Body 2" },
    ];

    mockUseSelector.mockReturnValue({ createdPosts: mockPosts });

    render(<PostsSection {...baseProps} />);

    expect(screen.getByTestId("mock-flat-list")).toBeDefined();

    expect(screen.getAllByText("DetailsComponent")).toHaveLength(2);

    const firstDetailsComponent = screen.getAllByText("DetailsComponent")[0];
    expect(firstDetailsComponent.props.title).toBe("Post Title 1");
    expect(firstDetailsComponent.props.description).toBe("Post Body 1");
    expect(firstDetailsComponent.props.fromPostsSection).toBe(true);
    expect(firstDetailsComponent.props.postId).toBe(0);

    expect(screen.queryByText("NoPostsComponent")).toBeNull();
  });
});
