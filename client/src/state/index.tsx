import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  user: User | null;
  authenticated: boolean;
}
const initialState: InitialState = {
  user: null,
  authenticated: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {

      state.user = action.payload;
      state.authenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const { setUser, clearUser } = globalSlice.actions;
export default globalSlice.reducer;
