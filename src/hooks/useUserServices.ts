import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { STRINGS } from "../constants/Strings";
import { useUpdateCommentMutation } from "../redux/slices/commentsApi";
import { addUserPost } from "../redux/slices/postDataSlice";
import { usePostPostsMutation } from "../redux/slices/postsApi";
import { showToast } from "../utils/helper";

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
        dispatch(
          addUserPost({
            body: data.post,
            title: data.postTitle,
            id: Date.now(),
          })
        );
        showToast(STRINGS.postPublished);
        return res;
      } catch (err) {
        showToast(STRINGS.toastError);
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
        showToast(STRINGS.commentUpdated);
      } catch (error) {
        showToast(STRINGS.toastError);
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
