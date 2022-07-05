import { createSlice } from "@reduxjs/toolkit";

export interface State {
  id: string;
  name: string;
  username: string;
  logged: boolean;
}

const initialState: State = {
  id: "",
  name: "",
  username: "",
  logged: localStorage.getItem("token") ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (user: State, action) => ({ ...action.payload, logged: true }),
    logout: () => ({ id: "", name: "", username: "", logged: false }),
  },
});

export const { login: loginActionCreator, logout: logoutActionCreator } =
  userSlice.actions;

export default userSlice.reducer;
