import api from './api.ts';
import { User } from '../types.ts';

type GetUsersResponse = User[];

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, null>({
      query: () => ({
        //url: '/User',
        url: '/users',
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
