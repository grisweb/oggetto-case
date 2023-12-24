import api from './api.ts';
import { Roles, User } from '../types.ts';

type GetUsersResponse = User[];

interface ApproveRequest {
  userId: number;
  isApproved: boolean;
  approvedRole: Roles | null;
}

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, null>({
      query: () => ({
        url: '/User',
        //url: '/users',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'User' as const, id })), 'User']
          : ['User'],
    }),
    approve: builder.mutation<null, ApproveRequest>({
      query: (body) => ({
        url: '/User/approve',
        method: 'POST',
        params: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useApproveMutation } = usersApi;
