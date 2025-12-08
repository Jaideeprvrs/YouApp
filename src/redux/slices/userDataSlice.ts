// src/store/userDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPost {
  title?: string;
  body: string;
  id: number;
}

export interface SignupFormState {
  name: string;
  email: string;
  createdAt: string;
}

interface UserDataState {
  createdPosts: UserPost[];
  signupForm: SignupFormState;
}

const initialSignupForm: SignupFormState = {
  name: "",
  email: "",
  createdAt: "",
};

const initialState: UserDataState = {
  createdPosts: [],
  signupForm: initialSignupForm,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // 💾 store a post created by user
    addUserPost: (state, action: PayloadAction<UserPost>) => {
      state.createdPosts.unshift(action.payload);
    },
    // deleteUserPost: (state, action: PayloadAction<UserPost>) => {
    //   state.createdPosts.unshift(action.payload);
    // },

    // set whole form at once (e.g., from saved data)
    setSignupForm: (state, action: PayloadAction<SignupFormState>) => {
      state.signupForm = action.payload;
    },
  },
});

export const { addUserPost, setSignupForm } = userDataSlice.actions;

export default userDataSlice.reducer;
