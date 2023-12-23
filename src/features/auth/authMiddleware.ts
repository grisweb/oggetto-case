import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setToken } from './authSlice.ts';
import { RootState } from '../../app/store.ts';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setToken,
  effect: async (_action, api) => {
    const { token } = (api.getState() as RootState).auth;
    if (token) {
      window.localStorage.setItem('accessToken', token);
    } else {
      window.localStorage.removeItem('accessToken');
    }
  },
});

export { listenerMiddleware };
