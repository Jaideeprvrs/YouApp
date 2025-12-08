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

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // 💾 store a post created by user
    addUserPost: (state, action: PayloadAction<UserPost>) => {
      state.createdPosts.unshift(action.payload);
    },
  },
});

export const { addUserPost } = userDataSlice.actions;

export default userDataSlice.reducer;
