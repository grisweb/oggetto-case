import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { setToken } from '../../features/auth/authSlice';

import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  },
});

const query: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(setToken(null));
  }

  return result;
};

const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: query,
  endpoints: () => ({}),
  tagTypes: ['Users'],
});

export default api;
