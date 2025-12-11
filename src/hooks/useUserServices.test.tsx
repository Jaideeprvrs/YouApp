import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-hooks";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { STRINGS } from "../constants/Strings";
import { useUserServices } from "./useUserServices";

const useDispatchMock = jest.spyOn(redux, "useDispatch");

jest.mock("react-native-root-toast", () => ({
  show: jest.fn(),
  durations: { SHORT: 1000 },
  positions: { BOTTOM: 1 },
}));

const mockPostPostsMutation = jest.fn();
const mockUpdateCommentMutation = jest.fn();

jest.mock("../redux/slices/postsApi", () => ({
  usePostPostsMutation: () => [
    mockPostPostsMutation,
    { isLoading: false, isError: false, isSuccess: false },
  ],
}));

jest.mock("../redux/slices/commentsApi", () => ({
  useUpdateCommentMutation: () => [
    mockUpdateCommentMutation,
    { isLoading: false, isError: false, isSuccess: false },
  ],
}));

const mockAddUserPost = jest.fn();
jest.mock("../redux/slices/postDataSlice", () => ({
  addUserPost: mockAddUserPost,
}));

jest.mock("../constants/Strings", () => ({
  STRINGS: {
    postPublished: "Post published successfully!",
    toastError: "An error occurred.",
    commentUpdated: "Comment updated!",
    GoogleSansMedium: "GoogleSansMedium",
  },
}));

jest.mock("../constants/Colors", () => ({
  COLORS: {
    toast: "#333",
    white: "#fff",
  },
}));
describe("useUserServices Unit Tests", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    // Default mock implementation for success cases
    mockPostPostsMutation.mockResolvedValue({
      unwrap: () => Promise.resolve({ id: 123 }),
    });
    mockUpdateCommentMutation.mockResolvedValue({
      unwrap: () => Promise.resolve({ success: true }),
    });
  });

  it("handleCreatePost dispatches action, shows success toast, and returns API response", async () => {
    const { result } = renderHook(() => useUserServices());

    const postData = { post: "Test body", postTitle: "Test Title" };

    await act(async () => {
      await result.current.handleCreatePost(postData);
    });

    expect(mockPostPostsMutation).toHaveBeenCalledWith(postData.post);

    expect(Toast.show).toHaveBeenCalledWith(
      STRINGS.postPublished,
      expect.anything()
    );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockAddUserPost).toHaveBeenCalledWith(
      expect.objectContaining({
        body: "Test body",
        title: "Test Title",
      })
    );
  });

  it("handleCreatePost shows error toast and throws error on API failure", async () => {
    const mockError = new Error("API failed");

    const { result } = renderHook(() => useUserServices());

    const postData = { post: "Failing post" };

    await expect(
      act(async () => {
        await result.current.handleCreatePost(postData);
      })
    ).rejects.toThrow("API failed");

    expect(Toast.show).toHaveBeenCalledWith(
      STRINGS.toastError,
      expect.anything()
    );

    // Verify Redux action was *not* dispatched
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("handleUpdateComment shows success toast on successful update", async () => {
    const { result } = renderHook(() => useUserServices());

    const commentData = { id: 1, body: "Updated comment body" };

    await act(async () => {
      await result.current.handleUpdateComment(commentData);
    });

    expect(mockUpdateCommentMutation).toHaveBeenCalledWith(commentData);

    expect(Toast.show).toHaveBeenCalledWith(
      STRINGS.commentUpdated,
      expect.anything()
    );
  });

  it("handleUpdateComment shows error toast and throws error on API failure", async () => {
    const mockError = new Error("Update failed");
    mockUpdateCommentMutation.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useUserServices());
    const commentData = { id: 1, body: "Updated comment body" };

    await expect(
      act(async () => {
        await result.current.handleUpdateComment(commentData);
      })
    ).rejects.toThrow("Update failed");

    expect(Toast.show).toHaveBeenCalledWith(
      STRINGS.toastError,
      expect.anything()
    );
  });
});
