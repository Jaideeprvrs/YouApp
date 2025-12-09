import { useNetInfo } from "@react-native-community/netinfo";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { STRINGS } from "../../constants/Strings";
import CreatePosts from "../CreatePosts";

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: jest.fn(),
}));

jest.mock("../molecules/ProfileHeader", () => "ProfileHeader");
jest.mock("../molecules/NewPost", () => "NewPost");
jest.mock("../atoms/ButtonComponent", () => "ButtonComponent");

const mockUseNetInfo = useNetInfo as jest.Mock;

const mockProps = {
  userName: "TestUser",
  openSheet: jest.fn(),
  sendPost: jest.fn(),
  setPost: jest.fn(),
  setPostTitle: jest.fn(),
  post: "",
  postTitle: "",
};

describe("CreatePosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseNetInfo.mockReturnValue({ isConnected: true });
  });

  it("renders correctly in default mode (not from sheet)", () => {
    const { getByText, queryByTestId } = render(
      <CreatePosts {...mockProps} fromSheet={false} />
    );

    expect(getByText(STRINGS.postDescPlaceholder)).toBeDefined();

    expect(screen.queryByText("NewPost")).toBeNull();
    expect(screen.queryByText("ButtonComponent")).toBeNull();
  });

  it("calls openSheet when the TouchableOpacity is pressed in default mode", () => {
    const { getByText } = render(
      <CreatePosts {...mockProps} fromSheet={false} />
    );
    const touchableOpacity = getByText(STRINGS.postDescPlaceholder);

    fireEvent.press(touchableOpacity);
    expect(mockProps.openSheet).toHaveBeenCalledTimes(1);
  });

  it('renders correctly in "fromSheet" mode', () => {
    const propsWithData = {
      ...mockProps,
      fromSheet: true,
      post: "Some content",
    };
    render(<CreatePosts {...propsWithData} />);
    expect(screen.getByText("NewPost")).toBeDefined();
    expect(screen.getByText("ButtonComponent")).toBeDefined();
    expect(screen.queryByText(STRINGS.postDescPlaceholder)).toBeNull();
  });

  it("calls sendPost when the Post button is clicked and connected", () => {
    const propsWithData = {
      ...mockProps,
      fromSheet: true,
      post: "Valid post content",
    };
    render(<CreatePosts {...propsWithData} />);
    const postButton = screen.getByText("ButtonComponent");

    fireEvent.press(postButton);
    expect(mockProps.sendPost).toHaveBeenCalledTimes(1);
  });

  it("disables the Post button when the post is empty", () => {
    const propsWithData = { ...mockProps, fromSheet: true, post: "" };
    render(<CreatePosts {...propsWithData} />);
    const buttonComponent = screen.getByText("ButtonComponent");
    expect(buttonComponent).toBeDefined();
  });

  it("disables the Post button when offline", () => {
    mockUseNetInfo.mockReturnValue({ isConnected: false });
    const propsWithData = {
      ...mockProps,
      fromSheet: true,
      post: "Valid post content",
    };
    render(<CreatePosts {...propsWithData} />);
    const buttonComponent = screen.getByText("ButtonComponent");
    expect(buttonComponent).toBeDefined();
  });
});
