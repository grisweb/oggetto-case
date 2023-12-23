import { configureStore } from '@reduxjs/toolkit';

import layoutReducer from '../features/layout/layoutSlice.ts';
import authReducer from '../features/auth/authSlice.ts';

import api from './services/api';
import { listenerMiddleware } from '../features/auth/authMiddleware.ts';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
