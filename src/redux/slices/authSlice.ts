import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  isLoggedIn: boolean;
  name: string;
  email: string;
  id: number;
  joinedOn: string;
}

interface UserDataState {
  userData: UserData | null;
}

const initialState: UserDataState = {
  userData: null,
};

const authSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
