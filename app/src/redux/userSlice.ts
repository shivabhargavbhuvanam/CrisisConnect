import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  emailAddress: string | null;
  role: string | null;
  location: string | null;
}

const initialState: UserState = {
  username: null,
  emailAddress: null,
  role: null,
  location: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.emailAddress = action.payload.emailAddress;
      state.role = action.payload.role;
      state.location = action.payload.location;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;