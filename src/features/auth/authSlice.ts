import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
  token: string | null;
}

const initialState: AuthSlice = {
  token: window.localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthSlice['token']>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
