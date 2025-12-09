import { useCallback } from "react";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { useUpdateCommentMutation } from "../redux/slices/commentsApi";
import { addUserPost } from "../redux/slices/postDataSlice";
import { usePostPostsMutation } from "../redux/slices/postsApi";

export const useUserServices = () => {
  const dispatch = useDispatch();
  const [postPosts, { isLoading, isError, isSuccess }] = usePostPostsMutation();
  const [
    updateComment,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateCommentMutation();
  const handleCreatePost = useCallback(
    async (data: { post: string; postTitle?: string }) => {
      try {
        const res = await postPosts(data.post).unwrap();

        Toast.show(STRINGS.postPublished, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: COLORS.toast,
          textColor: COLORS.white,
          opacity: 0.95,
          containerStyle: {
            borderRadius: 12,
            paddingHorizontal: 20,
          },
          textStyle: {
            fontSize: 16,
            fontFamily: STRINGS.GoogleSansMedium,
          },
        });
        dispatch(
          addUserPost({
            body: data.post,
            title: data.postTitle,
            id: Date.now(),
          })
        );
        return res;
      } catch (err) {
        Toast.show(STRINGS.toastError, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: COLORS.toast,
          textColor: COLORS.white,
          opacity: 0.95,
          containerStyle: {
            borderRadius: 12,
            paddingHorizontal: 20,
          },
          textStyle: {
            fontSize: 16,
            fontFamily: STRINGS.GoogleSansMedium,
          },
        });
        console.error("Post failed", err);
        throw err;
      }
    },
    [postPosts, dispatch]
  );
  const handleUpdateComment = useCallback(
    async ({ id, body }) => {
      try {
        await updateComment({ id, body }).unwrap();
        Toast.show(STRINGS.commentUpdated, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: COLORS.toast,
          textColor: COLORS.white,
          opacity: 0.95,
          containerStyle: {
            borderRadius: 12,
            paddingHorizontal: 20,
          },
          textStyle: {
            fontSize: 16,
            fontFamily: STRINGS.GoogleSansMedium,
          },
        });
      } catch (error) {
        Toast.show(STRINGS.toastError, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: COLORS.toast,
          textColor: COLORS.white,
          opacity: 0.95,
          containerStyle: {
            borderRadius: 12,
            paddingHorizontal: 20,
          },
          textStyle: {
            fontSize: 16,
            fontFamily: STRINGS.GoogleSansMedium,
          },
        });

        throw error;
      }
    },
    [updateComment]
  );
  return {
    handleCreatePost,
    isLoading,
    isError,
    isSuccess,
    handleUpdateComment,
    updateLoading,
    updateError,
    updateSuccess,
  };
};
