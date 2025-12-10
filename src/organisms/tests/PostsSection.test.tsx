import { render, screen } from "@testing-library/react-native";
import React from "react";
import { useSelector as useSelectorMock } from "react-redux";
import { STRINGS } from "../../constants/Strings";
import PostsSection from "../PostsSection"; // Adjust import path

const defaultProps = {
  openSheet: jest.fn(),
};

import { jest } from "@jest/globals";
import * as redux from "react-redux";

const useSelectorMock = jest.spyOn(redux, "useSelector");
const useDispatchMock = jest.spyOn(redux, "useDispatch");

jest.mock("../molecules/DetailsComponent", () => "DetailsComponent");
jest.mock("../molecules/NoPostsComponent", () => "NoPostsComponent");

jest.mock("../constants/Strings", () => ({
  STRINGS: {
    noPostsdesc: "You have not created any posts yet.",
    createPost: "Create Post",
    noPostsTitle: "No Posts Found",
  },
}));

jest.mock("react-native/Libraries/Lists/FlatList", () => {
  const React = require("react");
  const MockFlatList = (props: any) => {
    if (props.data && props.data.length > 0) {
      return (
        <React.View testID="mock-flatlist">
          {props.data.map((item: any, index: number) =>
            props.renderItem({ item, index })
          )}
        </React.View>
      );
    }
    return <React.View testID="mock-flatlist-empty" />;
  };
  return MockFlatList;
});

describe("PostsSection Component Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useSelectorMock.mockReturnValue({
      createdPosts: [],
    });
  });

  it("renders NoPostsComponent when no posts are available", () => {
    render(<PostsSection {...defaultProps} />);

    expect(screen.getByText("NoPostsComponent")).toBeOnTheScreen();

    expect(screen.queryByTestId("mock-flatlist")).toBeNull();
  });

  it("passes the correct message and onClick handler to NoPostsComponent", () => {
    render(<PostsSection {...defaultProps} />);
    const noPostsComponent = screen.getByText("NoPostsComponent");

    expect(noPostsComponent.props.message).toBe(STRINGS.noPostsdesc);
    expect(noPostsComponent.props.title).toBe(STRINGS.noPostsTitle);
    expect(noPostsComponent.props.onClickText).toBe(STRINGS.createPost);
    expect(noPostsComponent.props.onClick).toBe(defaultProps.openSheet);
  });

  it("renders the FlatList and post items when posts are available", () => {
    const mockPosts = [
      { id: "1", title: "First Post", body: "Body 1" },
      { id: "2", title: "Second Post", body: "Body 2" },
    ];

    useSelectorMock.mockReturnValue({
      createdPosts: mockPosts,
    });

    render(<PostsSection {...defaultProps} />);

    expect(screen.getByTestId("mock-flatlist")).toBeOnTheScreen();

    expect(screen.getAllByText("DetailsComponent")).toHaveLength(2);
  });

  it("passes correct data to the individual DetailsComponent instances", () => {
    const mockPosts = [
      { id: "1", title: "Test Title 1", body: "Test Description 1" },
    ];

    useSelectorMock.mockReturnValue({
      createdPosts: mockPosts,
    });

    render(<PostsSection {...defaultProps} />);

    const detailsComponent = screen.getByText("DetailsComponent");

    expect(detailsComponent.props.title).toBe("Test Title 1");
    expect(detailsComponent.props.description).toBe("Test Description 1");
    expect(detailsComponent.props.fromPostsSection).toBe(true);
    expect(detailsComponent.props.postId).toBe(0);
  });

  it("does not render NoPostsComponent when posts array is not empty", () => {
    const mockPosts = [{ id: "1", title: "Test Title", body: "Test Body" }];
    useSelectorMock.mockReturnValue({ createdPosts: mockPosts });

    render(<PostsSection {...defaultProps} />);

    expect(screen.queryByText("NoPostsComponent")).toBeNull();
  });
});
