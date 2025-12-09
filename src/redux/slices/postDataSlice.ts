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
    addUserPost: (state, action: PayloadAction<UserPost>) => {
      state.createdPosts.unshift(action.payload);
    },
  },
});

export const { addUserPost } = postsDataSlice.actions;

export default postsDataSlice.reducer;
