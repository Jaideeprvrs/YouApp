// src/store/userDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPost {
  title?: string;
  body: string;
  id: number;
}

interface UserDataState {
  createdPosts: UserPost[];
}

const initialState: UserDataState = {
  createdPosts: [],
};

const postsDataSlice = createSlice({
  name: "postsData",
  initialState,
  reducers: {
    // 💾 store a post created by user
    addUserPost: (state, action: PayloadAction<UserPost>) => {
      state.createdPosts.unshift(action.payload);
    },
    deleteUserPost: (state, action: PayloadAction<number>) => {
      state.createdPosts = state.createdPosts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const { addUserPost, deleteUserPost } = postsDataSlice.actions;

export default postsDataSlice.reducer;
