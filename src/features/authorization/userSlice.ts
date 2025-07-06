import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

type State = { userDetails: UserState | null };

const initialState: State = { userDetails: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      state.userDetails = action.payload;
    },
    removeUser: (state) => {
      state.userDetails = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
