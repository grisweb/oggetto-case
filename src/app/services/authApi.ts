import api from './api.ts';
import { setToken } from '../../features/auth/authSlice.ts';
import { User } from '../types.ts';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  accessToken: string;
  clientId: string;
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, null>({
      query: () => ({
        url: 'Authorization/get-me',
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/Authorization/authorize-user',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { accessToken },
          } = await queryFulfilled;
          dispatch(setToken(accessToken));
        } catch {
          /* empty */
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
