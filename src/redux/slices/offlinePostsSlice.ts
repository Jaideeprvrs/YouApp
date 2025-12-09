import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const offlinePostsSlice = createSlice({
  name: "offlinePosts",
  initialState,
  reducers: {
    saveOfflinePosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { saveOfflinePosts } = offlinePostsSlice.actions;
export default offlinePostsSlice.reducer;
