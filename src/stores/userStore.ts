import { createSlice } from '@reduxjs/toolkit';

export type User = {
  id: string;
  name: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
};

const initialState = null as User | null;

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: { payload: User }) => {
      state = payload;
      return state;
    },
    logout: state => {
      state = null;
      return state;
    },
  },
});

export const { login, logout } = userStore.actions;

export default userStore.reducer;
